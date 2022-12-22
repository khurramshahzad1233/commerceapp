const orderdata=require("../model/orderschema")
const Errorhandler=require('../utils/errorhandler');
const catchasyncerror = require("../middleware/catchasyncerror");
const productdata = require("../model/productschema");


exports.newordercontroller=catchasyncerror(async(req,res,next)=>{
    const {
        shippinginfo,
        orderitem,
        paymentinfo,
        itemprice,
        taxprice,
        shippingprice,
        totalprice,
    }=req.body;

    const order=await orderdata.create({
        shippinginfo,
        orderitem,
        paymentinfo,
        itemprice,
        taxprice,
        shippingprice,
        totalprice,
        user:req.user._id,
    });
    res.status(200).json({
        success:true,
        order,
    })
});

exports.getallordercontroller=catchasyncerror(async(req,res,next)=>{
    const allorder=await orderdata.find();

    let totalamount=0;
    allorder.forEach((order)=>{
        totalamount+=order.totalprice;
    })

    res.status(200).json({
        success:true,
        allorder,
        totalamount,
    })
});

exports.getsingleordercontroller=catchasyncerror(async(req,res,next)=>{
    const order=await orderdata.findById(req.params.id).populate(
        "user",
        "name,email"
    );
    if(!order){
        return next(new Errorhandler("order not found with this id",404))
    };
    res.status(200).json({
        success:true,
        order,
    })
})


exports.getmyordercontroller=catchasyncerror(async(req,res,next)=>{
    const myorder=await orderdata.find({user:req.user._id})

    res.status(200).json({
        success:true,
        myorder,
    })
});

exports.deleteordercontroller=catchasyncerror(async(req,res,next)=>{
    const order=await orderdata.findById(req.params.id);

    if(!order){
        return next(new Errorhandler("order not found with this id",404))

    };
    await order.remove();
    res.status(200).json({
        success:true,

    })
});

exports.updateorderstatuscontroller=catchasyncerror(async(req,res,next)=>{
    const order=await orderdata.findById(req.params.id);
    if(!order){
        return next(new Errorhandler("order not found",404))
    };

    order.orderstatus=req.body.status;

    if(order.orderstatus==="delivered"){
        return next(new Errorhandler("your order is already been delivered",400))
    };

    if(req.body.status==="shipped"){
        order.orderitem.forEach(async(ord)=>{
            await updatestock(ord.product,ord.quantity)
        })
    };
    if(req.body.status==="delivered"){
        order.deliveredAt=Date.now()
    };
    await order.save({validateBeforeSave:false})

    res.status(200).json({
        success:true,
    })
});

async function updatestock(id,quantity){
    const product=await productdata.findById(id);
    product.stock-=quantity;
    await product.save({validateBeforeSave:false});
}