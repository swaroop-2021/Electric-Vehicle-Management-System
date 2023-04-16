const BloomACCRunner=require("../ABAC_Class");

exports.login = async(req,res,next)=>{
    let {
        email,
        password
    }=req.body;
    let status,message,role;

    message=await BloomACCRunner.login(email,password);
    if(message.split(";")[0]==="Authentication Successfull")
    {
        role=message.split(";")[1];
        status=true;
    }
    else{
        role=null
        status=false;
    }
    message=message.split(";")[0];
    res.status(200).json({message:message,status:status,role:role});
};

exports.signup = async(req,res,next)=>{
    console.log(req.body);
    let {
        address,
        email,
        password
    }=req.body;
    
    let status,message;

    message=await BloomACCRunner.signUp(address,email,password,"user");
    console.log(message);
    if(message==="SignUp Successful")
    {
        status=true;
    }
    else{
        status=false;
    }
    res.status(200).json({message:message,status:status});
};

exports.depolyNewSystem = (req,res,next)=>{
    BloomACCRunner.deploy_bloomacc();
};

exports.connectExistingSystem = (req,res,next)=>{
    BloomACCRunner.connect_bloomacc();
};

exports.addEV = async(req,res,next)=>{
    // console.log(req.body);
    let{
        address,
        manufacturer,
        currentLocation,
        vehicleType,
        ownerName,
        licensePlate,
        energyCapacity
    } = req.body;

    let a="";
    let info=a.concat(manufacturer,";",currentLocation,";",vehicleType,";",ownerName,";",licensePlate,";",energyCapacity)
    let message=await BloomACCRunner.sendSubject(address,info,BloomACCRunner.ev_manufacturer[BloomACCRunner.ev_manufacturer.length - 1]);
    res.status(200).json({message:message})
};

exports.addCS= async(req,res,next)=>{
    let {address,
        plugType,
        location,
        pricingModel,
        numChargingOutlets,
        chargingPower,
        fastCharging
    } = req.body;
    
    let a="";

    let info=a.concat(plugType,";",location,";",pricingModel,";",numChargingOutlets,";",chargingPower,";",fastCharging);
    
    let message=await BloomACCRunner.sendObject(address,info,BloomACCRunner.cs_leader[BloomACCRunner.cs_leader.length - 1]);
    res.status(200).json({message:message})
};

exports.accessControl = (req,res,next)=>{
    
};

exports.addPolicy = async(req,res,next)=>{
    let {subAddress,
        objAddress,
        read,
        write,
        execute,
        minInterval,
        startTime,
        endTime
    } = req.body;

    let sub_values=await BloomACCRunner.sac_contract.methods.get_ev(subAddress).send({from:BloomACCRunner.accounts[0],gas:500000})

    // console.log(sub_values.events.GetSubject.returnValues);
    let policy="";
    let{
        manufacturer,
        currentLocation,
        vehicleType,
        ownerName,
        licensePlate,
        energyCapacity
    } = sub_values.events.GetSubject.returnValues;
    policy+=manufacturer+";"+currentLocation+";"+vehicleType+";"+ownerName+";"+licensePlate+";"+energyCapacity+":";

    let obj_values=await BloomACCRunner.oac_contract.methods.get_cs(objAddress).send({from:BloomACCRunner.accounts[0],gas:500000})

    let {
        plugType,
        location,
        pricingModel,
        numChargingOutlets,
        chargingPower,
        fastCharging
    } = obj_values.events.GetObject.returnValues;

    policy+=plugType+";"+location+";"+pricingModel+";"+numChargingOutlets+";"+chargingPower+";"+fastCharging+":";

    policy+=read+";"+write+";"+execute+":"+minInterval+";"+startTime+";"+endTime;

    let policy_res=await BloomACCRunner.sendPolicy(policy);

    res.status(200).json({message:policy_res});
};