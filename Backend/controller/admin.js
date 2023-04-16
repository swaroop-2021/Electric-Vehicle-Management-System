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

exports.addEV = (req,res,next)=>{
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
    BloomACCRunner.sendSubject(address,info,BloomACCRunner.ev_manufacturer[BloomACCRunner.ev_manufacturer.length - 1]);
};

exports.addCS= (req,res,next)=>{
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
    
    BloomACCRunner.sendObject(address,info,BloomACCRunner.cs_leader[BloomACCRunner.cs_leader.length - 1]);
};

exports.accessControl = (req,res,next)=>{
    
};

exports.addPolicy = (req,res,next)=>{
    
};