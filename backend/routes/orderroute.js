const express=require("express");
const { getallordercontroller, newordercontroller, getmyordercontroller, getsingleordercontroller, deleteordercontroller, updateorderstatuscontroller } = require("../controller/ordercontroller");
const {authuser,authrole}=require("../middleware/auth")
const router=express.Router();

router.route("/order/new").post(authuser,newordercontroller);
router.route("/order/me").get(authuser,getmyordercontroller);
router.route("/order/:id").get(authuser,getsingleordercontroller)
router.route("/admin/order/all").get(authuser,authrole("admin"),getallordercontroller);
router.route("/admin/order/:id").delete(authuser,authrole("admin"),deleteordercontroller);
router.route("/admin/order/:id").put(authuser,authrole("admin"),updateorderstatuscontroller);

module.exports=router;