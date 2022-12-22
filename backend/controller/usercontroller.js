const userdata=require("../model/userschema")
const catchasyncerror=require("../middleware/catchasyncerror")
const Errorhandler=require("../utils/errorhandler");
const cloudinary=require("cloudinary");
const sendtoken=require("../utils/sendtoken");
const crypto=require("crypto")
const sendEmail=require("../utils/sendEmail")


exports.getallusercontroller=catchasyncerror(async(req,res,next)=>{
    const alluser=await userdata.find();
    res.status(200).json({
        success:true,
        alluser,
    })
});


exports.registerusercontroller=catchasyncerror(async(req,res,next)=>{
    const mycloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
        folder:"avatar",
        width:150,
        crop:"scale"
    });
    const {name,email,password}=req.body;
    const user=await userdata.create({
        name,email,password,
        avatar:{
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        }
    });
    sendtoken(user,201,res)

});

exports.loginusercontroller=catchasyncerror(async(req,res,next)=>{
    const {email,password}=req.body;
    if(!email||!password){
        return next(new Errorhandler("plz enter email and password",400))
    };
    const user=await userdata.findOne({email}).select("+password");
    if(!user){
        return next(new Errorhandler("invalid email or password",401))
    };
    const matchpassword=await user.comparepassword(password);
    if(!matchpassword){
        return next(new Errorhandler("invalid email or password",401))
    };
    sendtoken(user,200,res)
});

exports.logoutusercontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id);
    if(!user){
        return next(new Errorhandler("plz login to access the resource",400))
    };
    res.cookie("token",null,{
        expires:new Date(Date.now()),
        httpOnly:true,
    });
    res.status(200).json({
        success:true,
        message:"logout successfully",
    })
});


exports.getprofilecontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id);
    if(!user){
        return next(new Errorhandler("plz login to access the resource"))
    };
    res.status(200).json({
        success:true,
        user,
    })
});


exports.getsingleusercontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.params.id);
    if(!user){
        return next(new Errorhandler("user not found",404))
    };
    res.status(200).json({
        success:true,
        user,
    })
});

exports.updateprofilecontroller=catchasyncerror(async(req,res,next)=>{
    let newuserdata={
        name:req.body.name,
        email:req.body.email,
    };

    if(req.body.avatar!==""){
        let user=await userdata.findById(req.user.id);
        const imageid=user.avatar.public_id;
        await cloudinary.v2.uploader.destroy(imageid);

        const mycloud=await cloudinary.v2.uploader.upload(req.body.avatar,{
            folder:"avatar",
            width:150,
            crop:"scale"
        });
        newuserdata.avatar={
            public_id:mycloud.public_id,
            url:mycloud.secure_url,

        }
    };
    let user=await userdata.findByIdAndUpdate(req.user.id,newuserdata,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,

    })
});

exports.updatepasswordcontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.user.id).select("+password");

    if(!user){
        return next(new Errorhandler("plz login to access the resource",401))
    };
    const matchpassword=await user.comparepassword(req.body.oldpassword);
    if(!matchpassword){
        return next(new Errorhandler("incorrect password",401))
    };

    if(req.body.newpassword!==req.body.confirmpassword){
        return next(new Errorhandler("Password are not matched",400))
    };
    user.password=req.body.newpassword;
    await user.save();

    sendtoken(user,200,res)

});

exports.updateuserrolecontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.params.id);

    if(!user){
        return next(new Errorhandler("user does not exist",404))
    };
    const newuserdata={
        email:req.body.email,
        name:req.body.name,
        role:req.body.role,
    };
    await userdata.findByIdAndUpdate(req.params.id,newuserdata,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
        user,
    })
})

exports.deleteusercontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findById(req.params.id);
    if(!user){
        return next(new Errorhandler("user not found",404))
    };
    const imageid=user.avatar.public_id;
    await cloudinary.v2.uploader.destroy(imageid);
    await user.remove();

    res.status(200).json({
        success:true,
        message:"deleted successfully",
    })
});

exports.forgotpasswordcontroller=catchasyncerror(async(req,res,next)=>{
    const user=await userdata.findOne({email:req.body.email});
    if(!user){
        return next(new Errorhandler("user not found",404))
    };

    const resettoken=user.getresetpasswordtoken();
    await user.save({validateBeforeSave:false});
    const resetpasswordurl=`${req.protocol}://${req.get("host")}/password/reset/${resettoken}`;
    const message=`your password reset token is :- /n/n ${resetpasswordurl} /n/n if you are not requested this email then plz ignore it`;

    try {
        await sendEmail({
            email:user.email,
            subject:"password recovery",
            message,
        })
        
    } catch (error) {
        user.resetpasswordtoken=undefined;
        user.resetpasswordexpire=undefined;
        await user.save({validateBeforeSave:false});
        return next(new Errorhandler(error.message,500))
        
    }
});

exports.resetpasswordcontroller=catchasyncerror(async(req,res,next)=>{
    const resettoken=req.params.token;
    const resetpasswordtoken=crypto.createHash("sha256").update(resettoken).digest("hex");

    const user=await userdata.findOne({
        resetpasswordtoken,
        resetpasswordexpire:{$gt:Date.now()},
    });
    if(!user){
        return next(new Errorhandler("reset password token is invalid or has been expired",400))
    };
    if(req.body.newpassword!==req.body.confirmpassword){
        return next(new Errorhandler("password does not matched",400))
    };
    user.password=req.body.newpassword;
    user.resetpasswordtoken=undefined;
    user.resetpasswordexpire=undefined;

    await user.save();

    sendtoken(user,200,res);
});