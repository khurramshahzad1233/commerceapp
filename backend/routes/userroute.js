const express=require("express");
const { getallusercontroller, registerusercontroller, loginusercontroller, getprofilecontroller, logoutusercontroller, updateprofilecontroller, updatepasswordcontroller, deleteusercontroller, updateuserrolecontroller, getsingleusercontroller } = require("../controller/usercontroller");
const {authuser, authrole}=require("../middleware/auth")
const router=express.Router();

router.route("/user/register").post(registerusercontroller);
router.route("/user/login").post(loginusercontroller);
router.route("/user/me").get(authuser,getprofilecontroller);
router.route("/user/logout").get(authuser,logoutusercontroller);
router.route("/user/update").put(authuser,updateprofilecontroller);
router.route("/user/password/update").put(authuser,updatepasswordcontroller);
router.route("/admin/user/all").get(authuser,authrole("admin"),getallusercontroller);
router.route("/admin/user/:id").delete(authuser,authrole("admin"),deleteusercontroller);
router.route("/admin/user/:id").put(authuser,authrole("admin"),updateuserrolecontroller);
router.route("/admin/user/:id").get(authuser,authrole("admin"),getsingleusercontroller);


module.exports=router;