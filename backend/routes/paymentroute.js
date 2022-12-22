const express=require("express");
const { paymentprocess, sendstripeapikey } = require("../controller/paymentcontroller");
const {authuser}=require("../middleware/auth")
const router=express.Router();

router.route("/payment/process").post(authuser,paymentprocess);
router.route("/stripeapikey").get(sendstripeapikey)


module.exports=router;