const express=require("express");
const { getallproductcontroller, searchproductcontroller, createproductcontroller, productdetailcontroller, createproductreviewcontroller, deleteproductcontroller, updateproductcontroller, getallproductreviewcontroller, deletereviewcontroller } = require("../controller/productcontroller");
const {authuser,authrole} =require("../middleware/auth")
const router=express.Router();

router.route("/product/search").get(searchproductcontroller);
router.route("/admin/product/create").post(authuser,authrole("admin"),createproductcontroller);
router.route(`/product/:id`).get(productdetailcontroller);
router.route("/product/review/new").put(authuser,createproductreviewcontroller)
router.route("/admin/product/all").get(authuser,authrole("admin"),getallproductcontroller);
router.route("/admin/product/:id").delete(authuser,authrole("admin"),deleteproductcontroller);
router.route("/admin/product/:id").put(authuser,authrole("admin"),updateproductcontroller);
router.route("/admin/product/review").get(authuser,authrole("admin"),getallproductreviewcontroller)
router.route("/admin/product/review").delete(authuser,authrole("admin"),deletereviewcontroller)

module.exports=router;