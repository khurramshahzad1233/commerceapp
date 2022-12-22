const catchasyncerror=require("../middleware/catchasyncerror")
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config.env"})
};
const stripe=require("stripe")(process.env.SECRET_KEY);

exports.paymentprocess=catchasyncerror(async(req,res,next)=>{
    const mypayment=await stripe.paymentIntents.create({
        amount:req.body.amount,
        currency:"usd",
        metadata:{
            company:"Ecommerce",
        },
    });
    res.status(200).json({
        success:true,
        client_secret:mypayment.client_secret
    });
});

exports.sendstripeapikey=catchasyncerror(async(req,res,next)=>{
    res.status(200).json({
        stripeapikey:process.env.PUBLISHABLE_KEY
    })
});