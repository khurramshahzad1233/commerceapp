const userdata=require("../model/userschema")
const catchasyncerror=require("./catchasyncerror")
const Errorhandler=require("../utils/errorhandler")
const jwt=require("jsonwebtoken")

exports.authuser=catchasyncerror(async(req,res,next)=>{
    const {token}=req.cookies;

    if(!token){
        return next(new Errorhandler("plz login to access the resource",401))
    };
    const accessdata=jwt.verify(token,process.env.jwt_secret_key);
    req.user=await userdata.findById(accessdata.id);

    next()
});


exports.authrole=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            return next(new Errorhandler("resource not allowed",401))
        };
        next();
    }
}