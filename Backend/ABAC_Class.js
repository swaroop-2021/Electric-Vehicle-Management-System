const fs=require("fs");
const path=require("path");
const solc=require("solc");

const Web3=require("web3");

class BloomACCRunner {
  // Class Variables
  GANACHE_URL = "HTTP://127.0.0.1:8545";
  CHAIN_ID = 4321;

  constructor() {
    // Instance Variables
    this.w3 = null;
    this.accounts=null;

    // Access Control Contract Variables
    this.acc_address = null;
    this.acc_abi = null;
    this.acc_contract = null;

    // EVToken Contract Variables
    this.evtoken_address = null;
    this.evtoken_abi = null;
    this.evtoken_contract = null;

    // Object Attribute Contract Variables
    this.oac_address = null;
    this.oac_abi = null;
    this.oac_contract = null;

    // Policy Management Contract Variables
    this.pmc_address = null;
    this.pmc_abi = null;
    this.pmc_contract = null;

    // Subject Attribute Contract Variables
    this.sac_address = null;
    this.sac_abi = null;
    this.sac_contract = null;

    // Important Player Addresses
    this.admin = null;
    this.cs_leader = [];
    this.ev_manufacturer = [];
    this.subjects = [];
    this.objects = [];
  }

  async deploy_bloomacc() {
    console.log("deploying");
    let contractPath=path.resolve(__dirname,"BloomACC_Codes","Contracts","AccessControlContract.sol");
    let contractSource = fs.readFileSync(contractPath, "UTF-8");

    let input = {
        language: 'Solidity',
        sources: {
          'AccessControlContract.sol': {
            content: contractSource
          }
        },
        settings: {
          outputSelection: {
            '*': {
              '*': ['abi', 'evm.bytecode']
            }
          },
        }
      };


    function findImports(path_){
        let contractPath_=path.resolve(__dirname,"BloomACC_Codes","Contracts",path_);
        let file=fs.readFileSync(contractPath_, "UTF-8");  
        return {contents: file};
    }
    
    let output=JSON.parse(solc.compile(JSON.stringify(input),{ import: findImports }));
    // output=JSON.parse(solc.compile(JSON.stringify(input),));
    // output=JSON.parse(solc.compile(JSON.stringify(input),));
    // output=JSON.parse(solc.compile(JSON.stringify(input),));
    
    let compiledSol=output.contracts;
    // console.log(compiledSol)
    
    // Create web3 instance
    this.w3 = new Web3(new Web3.providers.HttpProvider(this.GANACHE_URL));
    if (await this.w3.eth.net.isListening()) {
      console.log("\n[SUCCESS] Connected to the Geth Instance...\n");
    } else {
      console.log("\n[FAILURE] Error connecting to Ganache Instance...\n");
      return;
    }
    this.accounts = await this.w3.eth.getAccounts();
    await this.w3.eth.personal.unlockAccount(this.accounts[0],"node1",9999999);
    
    // Get total supply of token
    const numToken = 1000;
    // console.log(this.accounts[0]);
    this.admin = this.accounts[0];
    // Add EV Manufacturers and CS Leaders
    try {
      this.ev_manufacturer.push(this.accounts[11]);
      this.ev_manufacturer.push(this.accounts[12]);
      this.cs_leader.push(this.accounts[13]);
    } catch (e) {
      console.log("[ERROR] Make sure there are at least 14 accounts in Ganache...");
      process.exit(1);
    }
    // Add subjects and objects addresses
    for (let i = 1; i <= 5; i++) {
      this.subjects.push(this.accounts[i]);
    }
    for (let i = 6; i <= 10; i++) {
      this.objects.push(this.accounts[i]);
    }
    let nonce = await this.w3.eth.getTransactionCount(this.admin);

    nonce -= 1;
    // Deploy PMC, SAC, OAC
    for (let name in compiledSol) {
        // Skip ACC, EVToken and SafeMath
        const shortName = Object.keys(compiledSol[name])[0];
        if (
        shortName === "AccessControl" ||
        shortName === "EVToken" ||
        shortName === "SafeMath"
        ) {
            continue;
        }

        console.log(`[DEPLOYING] ${shortName}`);
        // console.log(compiledSol[name][shortName]["abi"][0])
        // console.log(compiledSol[name][shortName]["evm"]["bytecode"]["object"])

        // ABI
        const abi = (compiledSol[name][shortName]["abi"]);
        // Bytecode
        const bytecode = "0x" +compiledSol[name][shortName]["evm"]["bytecode"]["object"];
        let abc= await this.w3.eth.estimateGas({data:bytecode});
        // console.log(abc);
        // Submit the transaction to deploy the contracts
        nonce += 1;
        const options = {
            chainId: this.CHAIN_ID,
            from: this.admin,
            nonce: nonce,
            data: bytecode,
        };
        // Create contract instance
        const contractInsatnce = new this.w3.eth.Contract(abi,options);
        let contractAddress;
        await contractInsatnce.deploy(options).send({
            from: this.admin,
            gas:10000000
        }).then((instance_)=>{
            // console.log(instance_)
            contractAddress=instance_.options.address;
        });
        const contractInstance = new this.w3.eth.Contract(abi,contractAddress);

        switch (shortName) {
            case "SubjectAttribute":
                this.sac_abi = abi;
                this.sac_address = contractAddress;
                this.sac_contract = contractInstance;
                break;
            case "ObjectAttribute":
                this.oac_abi = abi;
                this.oac_address = contractAddress;
                this.oac_contract = contractInstance;
                break;
            default:
                this.pmc_abi = abi;
                this.pmc_address = contractAddress;
                this.pmc_contract = contractInstance
        }

        console.log(`[SUCCESS] ${shortName} Successfully Deployed!!!`)
        console.log(`[INFO] Contract Address: ${contractAddress}\n`)
    }

    // Deploy EVToken Contract
    for (let name in compiledSol) {
        // Find EVToken Contract
        const shortName = Object.keys(compiledSol[name])[0];

        if(shortName!=="EVToken")
            continue;
        
        console.log(`[DEPLOYING] ${shortName}`);

        // ABI
        const abi = (compiledSol[name][shortName]["abi"]);
        // Bytecode
        const bytecode = "0x" +compiledSol[name][shortName]["evm"]["bytecode"]["object"];
        // Create contract instance

        nonce += 1;
        const options = {
            arguments:[numToken],
            chainId: this.CHAIN_ID,
            from: this.admin,
            nonce: nonce,
            data: bytecode
        };

        const contractInsatnce = new this.w3.eth.Contract(abi,options);
        let abc= await contractInsatnce.deploy(options).estimateGas();
        // console.log(abc);
        // Submit the transaction to deploy the contracts
        
        let contractAddress;
        await contractInsatnce.deploy(options).send({
            from: this.admin,
            gas:abc
        }).then((instance_)=>{
            // console.log(instance_)
            contractAddress=instance_.options.address;
        });
        const contractInstance = new this.w3.eth.Contract(abi,contractAddress);

        this.evtoken_abi=abi;
        this.evtoken_address=contractAddress;
        this.evtoken_contract=contractInstance;

        console.log(`[SUCCESS] ${shortName} Successfully Deployed!!!`)
        console.log(`[INFO] Contract Address: ${contractAddress}\n`)
        
    }

    let name,shortName;
    // Deploy AccessControl Contract
    for (let name_ in compiledSol) {
      // Find AccessControl Contract
      shortName = Object.keys(compiledSol[name_])[0];

      if(shortName==="AccessControl"){
        name=name_;
        break;
      }
    }
      
      console.log(`[DEPLOYING] ${shortName}`);

      // ABI
      const abi = (compiledSol[name][shortName]["abi"]);
      // Bytecode
      const bytecode = "0x" +compiledSol[name][shortName]["evm"]["bytecode"]["object"];

      nonce += 1;
      const options = {
        arguments:[this.sac_address, this.oac_address, this.pmc_address, this.evtoken_address],
          chainId: this.CHAIN_ID,
          from: this.admin,
          nonce: nonce,
          data: bytecode
      };
      
      // Create contract instance
      const contractInsatnce = new this.w3.eth.Contract(abi,options);
      let abc= await contractInsatnce.deploy(options).estimateGas();
      // console.log(abc);
      // Submit the transaction to deploy the contracts
      
      let contractAddress;
      await contractInsatnce.deploy(options).send({
          from: this.admin,
          gas:abc
      }).then((instance_)=>{
          // console.log(instance_)
          contractAddress=instance_.options.address;
      });
      const contractInstance = new this.w3.eth.Contract(abi,contractAddress);

      this.acc_abi=abi;
      this.acc_address=contractAddress;
      this.acc_contract=contractInstance;

      console.log(`[SUCCESS] ${shortName} Successfully Deployed!!!`)
      console.log(`[INFO] Contract Address: ${contractAddress}\n`)
      
      

    const folder = "Artifacts";
    try {
      console.log(`[CREATING] Folder called '${folder}'`);
      fs.mkdirSync(folder);
    } 
    catch (err) {
        if (err.code === 'EEXIST') {
        console.log(`${folder} already exists!`);
        console.log(`${err}\n`);
      } else {
        throw err;
      }
    }


    // Save Contract Info
    // ACC
    console.log("[SAVING] Contracts...");
    fs.writeFileSync("./Artifacts/AccessControl.contract", `${this.acc_address}\n${JSON.stringify(this.acc_abi)}`);
    fs.writeFileSync("./Artifacts/EVToken.contract", `${this.evtoken_address}\n${JSON.stringify(this.evtoken_abi)}`);
    fs.writeFileSync("./Artifacts/ObjectAttribute.contract",`${this.oac_address}\n${JSON.stringify(this.oac_abi)}`);
    fs.writeFileSync("./Artifacts/PolicyManagement.contract",`${this.pmc_address}\n${JSON.stringify(this.pmc_abi)}`);
    fs.writeFileSync("./Artifacts/SubjectAttribute.contract",`${this.sac_address}\n${JSON.stringify(this.sac_abi)}`);

    await this.w3.eth.personal.unlockAccount(this.accounts[0],"node1",999999);
    
    await this.setAccessToken();
    await this.addCsLeader();
    await this.addEvManufacturer();

    await this.w3.eth.personal.unlockAccount(this.accounts[0],"node1",999999);
    
    await this.addSubject();
    await this.addObject();
    // await this.addPolicy();

    await this.signUp(this.admin,"admin@gmail.com","admin","admin");
}

  async connect_bloomacc() {
    

    // Setting web3 instance
    this.w3 = new Web3(new Web3.providers.HttpProvider(this.GANACHE_URL));

    if (this.w3.eth.net.isListening()) {
      console.log("\n[SUCCESS] Connected to Ganache instance...");
    } else {
      console.log("\n[FAILURE] Error connecting to Ganache instance...");
      return;
    }

    this.accounts = await this.w3.eth.getAccounts();
    await this.w3.eth.personal.unlockAccount(this.accounts[0],"node1",9999999);
    // Setting player addresses
    console.log("[PROCESSING] Setting players...");
    this.admin = this.accounts[0];
    // Clear all the lists
    this.ev_manufacturer = [];
    this.cs_leader = [];
    this.subjects = [];
    this.objects = [];
    try {
      this.ev_manufacturer.push(this.accounts[11]);
      this.ev_manufacturer.push(this.accounts[12]);
      this.cs_leader.push(this.accounts[13]);
    } catch (error) {
      console.log("[ERROR] Make sure there are at least 14 accounts in Ganache...");
      return;
    }
    for (const address of this.accounts.slice(1, 6)) {
      this.subjects.push(address);
    }
    for (const address of this.accounts.slice(6, 11)) {
      this.objects.push(address);
    }

    // Contract info
    // ACC
    console.log("[PROCESSING] Accessing contract info...");
    try {
      const accContractInfo = fs.readFileSync("./Artifacts/AccessControl.contract", "utf-8");
      const accInfo = accContractInfo.split("\n");
      this.acc_address = accInfo[0];
      this.acc_abi = JSON.parse(accInfo[1]);

      const sacContractInfo = fs.readFileSync("./Artifacts/SubjectAttribute.contract", "utf-8");
      const sacInfo = sacContractInfo.split("\n");
      this.sac_address = sacInfo[0];
      this.sac_abi = JSON.parse(sacInfo[1]);

      const oacContractInfo = fs.readFileSync("./Artifacts/ObjectAttribute.contract", "utf-8");
      const oacInfo = oacContractInfo.split("\n");
      this.oac_address = oacInfo[0];
      this.oac_abi = JSON.parse(oacInfo[1]);

      const pmcContractInfo = fs.readFileSync("./Artifacts/PolicyManagement.contract", "utf-8");
      const pmcInfo = pmcContractInfo.split("\n");
      this.pmc_address = pmcInfo[0];
      this.pmc_abi = JSON.parse(pmcInfo[1]);

      const evTokenContractInfo = fs.readFileSync("./Artifacts/EVToken.contract", "utf-8");
      const evTokenInfo = evTokenContractInfo.split("\n");
      this.evtoken_address = evTokenInfo[0];
      this.evtoken_abi = JSON.parse(evTokenInfo[1]);
    } catch (error) {
      console.log("The files you are looking for are not here...");
      return;
    }

    // Contract objects
    console.log("[PROCESSING] Creating contract objects...");

    this.acc_contract = new this.w3.eth.Contract(
      this.acc_abi,
      this.acc_address
    );
    this.sac_contract = new this.w3.eth.Contract(
      this.sac_abi,
      this.sac_address
    );
    this.oac_contract = new this.w3.eth.Contract(
      this.oac_abi,
      this.oac_address
    );
    this.pmc_contract = new this.w3.eth.Contract(
      this.pmc_abi,
      this.pmc_address
    );
    this.evtoken_contract = new this.w3.eth.Contract(
      this.evtoken_abi,
      this.evtoken_address
    );
    console.log("[SUCCESS] Connected to deployed network...");
    await this.access_control(this.subjects[0],this.objects[0],0,(await this.oac_contract.methods.get_cs(this.objects[0]).send({from:this.admin,gas:500000})).events.GetObject.returnValues.location);
    await this.access_control(this.subjects[0],this.objects[0],0,(await this.oac_contract.methods.get_cs(this.objects[0]).send({from:this.admin,gas:500000})).events.GetObject.returnValues.location);
  }

  async setAccessToken(){
      // Sets access control contract address in EVToken Contract
      console.log("[ADMIN] Connecting ACC to EVToken...");
      const nonce = await this.w3.eth.getTransactionCount(this.admin);
      const tx = await this.evtoken_contract.methods.set_access_address(this.acc_address).send({from:this.admin});
   
  }

  async addCsLeader(){
    // Adds predefined CS Leaders who can then add CS stations (Objects)

    let nonce = await this.w3.eth.getTransactionCount(this.admin);
    nonce-=1;

    for(let address of this.cs_leader){
      console.log(`[ADMIN] Adding CS Leader 0x...${address.slice(-4)}`);

      nonce += 1;

      const tx= await this.oac_contract.methods.add_cs_leader(address).send({from:this.admin})
    }

  }

  async addEvManufacturer(){
    // Adds predefined EV Manufacturers that can add more Electric Vehicles (Subjects)
    
    let nonce = await this.w3.eth.getTransactionCount(this.admin);
    nonce-=1;

    for(let address of this.ev_manufacturer){
      console.log(`[ADMIN] Adding EV Manufacturer 0x...${address.slice(-4)}`);
      nonce += 1;

      const tx= await this.sac_contract.methods.add_ev_man(address).send({from:this.admin})
    }
  }

  async addSubject() {
    console.log("[ADD SUBJECTS] Adding subjects into the environment...");
    
    const subInfo = fs.readFileSync("./BloomACC_Codes/Attributes/subjects.txt", "utf-8").split("\n");
  
    const threads = [];
    for (let i = 0; i < subInfo.length; i++) {
      const info = subInfo[i].trim();
      if (info) {
        console.log(this.subjects[i]);
        await this.sendSubject(this.subjects[i], info, this.ev_manufacturer[this.ev_manufacturer.length - 1]);
      }
    }
  }

  async sendSubject(subAddr, info, evMan) {
    try {
        // console.log(info.split(";"));
        const tx = await this.sac_contract.methods.subject_add(subAddr,info.split(";") ).send({ from: this.admin,gas: 500000});
        console.log(`[SUCCESS] Added subject ${info.split(';')[0]}`);
        return `[SUCCESS] Added subject ${info.split(';')[0]}`;
    } catch (err) {
        console.log(err);
        console.log("[ERROR] Remember to add EV Manufacturers to Subject Contract!");
        return "[ERROR] Remember to add EV Manufacturers to Subject Contract!";
    }
  }

  async addObject() {
    // CS Leaders adding Charging Stations into the environment
    // Object Attributes:
    //   Plug Type, Location, Pricing Model, Number of Charging Outlets
    //   Charging Power, Fast Charging
    console.log("[ADD OBJECTS] Adding objects into the environment...");
    const obInfo = fs.readFileSync("./BloomACC_Codes/Attributes/objects.txt", "utf-8").split("\n");
  
    const threads = [];
    for (let i = 0; i < obInfo.length; i++) {
      const info = obInfo[i].trim();
      if (info) {
        console.log(this.objects[i]);
        const thread =await this.sendObject(this.objects[i], info, this.cs_leader[this.cs_leader.length - 1]);
        threads.push(thread);
      }
    }
  
  }

  async sendObject(obAddr, info, csLead) {
    // A helper function to send transaction for adding a new object
    try {
        // console.log(info.split(";"));
        
        console.log(obAddr,info);
        const tx = await this.oac_contract.methods.object_add(obAddr,info.split(";")).send({ from: this.admin,gas: 500000});
        // const tx1 = await this.oac_contract.methods.object_add(obAddr, info.split(";")).send({ from: csLead});
        console.log(`[SUCCESS] Added object ${info.split(';')[0]}`);
        return `[SUCCESS] Added object ${info.split(';')[0]}`
    } catch (err) {
        console.log(err);
        console.log("[ERROR] Remember to add CS Leaders to Object Contract!");
        return "[ERROR] Remember to add CS Leaders to Object Contract!";
    }
  }
  

  async addPolicy() {
    // Admin adding policies that control which subject can access what object.
    // Policy Content:
    // Subject = (Manufacturer, Current Location, Vehicle Type, Owner Name, License Plate Number, Energy Capacity, ToMFR)
    // Object = (Plug Type, Location, Pricing Model, Number of Charging Outlets, Charging Power, Fast Charging)
    // Action = (read, write, execute)
    // Context = (min_interval, start_time, end_time)
    // policy_add ABI expects 4 inputs: subject list, object list, action list, context list
    console.log("[ADD POLICIES] Adding policies into the environment...");
    const polInfo = fs.readFileSync("./BloomACC_Codes/Attributes/policies.txt", "utf-8").split("\n");
  
    const threads = [];
    for (let i = 0; i < polInfo.length; i++) {
      const info = polInfo[i].trim();
      if (info) {
        const thread =await this.sendPolicy(info);
        threads.push(thread);
      }
    }
  }

  async sendPolicy(policy) {
    // A helper function to add new policies to the PMC
    // Split policy into subject, object, action, context
    policy = policy.split(":");
    if (policy.length !== 4) {
      console.log("[ERROR] INVALID POLICY. MAKE SURE POLICY HAS 4 PARTS.");
      return "[ERROR] INVALID POLICY. MAKE SURE POLICY HAS 4 PARTS.";
    }
  
    for (let i = 0; i < 4; i++) {
      policy[i] = policy[i].split(";");
    }
  
    // Loop through every action and turn it into a boolean
    for (let i = 0; i < 3; i++) {
      if (policy[2][i].toLowerCase() === "true") {
        policy[2][i] = true;
      } else {
        policy[2][i] = false;
      }
    }
  
    // Convert context into list of 3 ints
    for (let i = 0; i < 3; i++) {
      policy[3][i] = parseInt(policy[3][i]);
    }
  
    // Send tx
    const tx_hash = await this.pmc_contract.methods.policy_add(...policy).send({"from": this.admin,gas: 500000 });
    console.log(tx_hash.events);
    
    console.log(
        `[SUCCESS] Added policy\n
          \t${policy[0]}\n
          \t${policy[1]}\n
          \t${policy[2]}\n
          \t${policy[3]}\n`
      );
    return "[SUCCESS] Policy Added";
  }

  async access_control(sub_addr,obj_addr,action,location) {

    // A method to get subject/object/action information and current location to call access control abi.
    // Access control ABI:
    // sub_id, obj_id, action all are ints
    //         Subject Attributes:
    //   Manufacturer, current_location, vehicle_type, charging_efficiency
    //   discharging_efficiency, energy_capacity, ToMFR
    action=parseInt(action);
    const attrib_list = ["", location, "", "", "", ""];
  
    try {
      const amountToSend = this.w3.utils.toWei('100', 'ether');  // Replace with the amount you want to send

      // Send the transaction
      await this.w3.eth.personal.unlockAccount(this.ev_manufacturer[this.ev_manufacturer.length - 1],"node1",999999);
      // await this.w3.eth.sendTransaction({
      //     from: this.admin,
      //     to: this.ev_manufacturer[this.ev_manufacturer.length - 1],
      //     value: amountToSend
      // });
      const tx =await this.sac_contract.methods.change_attribs(sub_addr,attrib_list).send({from:this.ev_manufacturer[this.ev_manufacturer.length - 1],gas:500000})
      console.log("Sent current location...");
      // console.log(tx);
    } catch (err) {
      console.log(`[ERROR] Subject with address (0x...${sub_addr.slice(-4)}) does not exist.\nOr ${err}\nOr make sure you have permissions to change attributes...`);
      return `${err}`;
    }
  
    try{
      
      const amountToSend = this.w3.utils.toWei('100', 'ether');  // Replace with the amount you want to send

      // Send the transaction

      await this.w3.eth.personal.unlockAccount(sub_addr,"node1",999999);
      // await this.w3.eth.sendTransaction({
      //     from: this.admin,
      //     to: sub_addr,
      //     value: amountToSend
      // });
      const tx=await this.acc_contract.methods.access_control(obj_addr, action).send({from:sub_addr,gas:500000});
      console.log(tx.events);
      if(tx.events.AccessDenied !==undefined){
        return `${tx.events.AccessDenied.returnValues.message}`;
      }
      return`${tx.events.AccessGranted.returnValues.message}`;
    }
    catch(err){
      console.log(`[ERROR] Subject with address (0x...${sub_addr.slice(-4)}) does not exist.\nOr ${err}\nOr make sure you have permissions to change attributes...`);
      return `${err}`;
    }
  }

  async login(email,password){
    const tx=await this.acc_contract.methods.login(email,password).send({from:this.admin,gas:500000});
    console.log(tx.events.Login.returnValues.message);

    let message=tx.events.Login.returnValues.message +";"+ tx.events.Login.returnValues.role;

    return message;
  }

  async signUp(address,email,password,role){
    const tx=await this.acc_contract.methods.signUp(address,email,password,role).send({from:this.admin,gas:500000});
    console.log(tx.events.SignUp.returnValues.message);

    let message=tx.events.SignUp.returnValues.message;

    return message;
  }
  
};

module.exports=new BloomACCRunner();