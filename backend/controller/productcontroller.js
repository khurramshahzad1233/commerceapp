const productdata=require("../model/productschema");
const catchasyncerror=require("../middleware/catchasyncerror")
const Errorhandler=require("../utils/errorhandler");
const cloudinary=require("cloudinary");
const Apifeature=require("../utils/apifeature")


exports.getallproductcontroller=catchasyncerror(async(req,res,next)=>{
    const allproduct=await productdata.find();
    res.status(200).json({
        success:true,
        allproduct,
    })
});

exports.searchproductcontroller=catchasyncerror(async(req,res,next)=>{
    const resultperpage=6;
    const productcount=await productdata.countDocuments();
    const apifeature=new Apifeature(productdata.find(),req.query)
    .search()
    .filter()
    .pagination(resultperpage);

    let products=await apifeature.query;
    let filterproductcount=products.length;

    res.status(200).json({
        success:true,
        resultperpage,
        productcount,
        products,
        filterproductcount,
    })
});


exports.createproductcontroller=catchasyncerror(async(req,res,next)=>{
    let images=[];
    if(typeof req.body.images==="string"){
        images.push(req.body.images)
    }else{
        images=req.body.images;
    };
    let imageslink=[];
    for(let i=0;i<images.length;i++){
        const mycloud=await cloudinary.v2.uploader.upload(images[i],{
            folder:"product",
        });
        imageslink.push({
            public_id:mycloud.public_id,
            url:mycloud.secure_url,
        });
    }
    req.body.images=imageslink;
    req.body.user=req.user.id;
    const product=await productdata.create(req.body);
    res.status(201).json({
        success:true,
        product,
        message:"new product created successfully"
    })

});

exports.updateproductcontroller=catchasyncerror(async(req,res,next)=>{
    let product=await productdata.findById(req.params.id);
    if(!product){
        return next(new Errorhandler("product not found",404))
    };

    let images=[];
    if(typeof req.body.images==="string"){
        images.push(req.body.images)
    }else{
        images=req.body.images;
    };

    if(images!==undefined){
        for(let i=0;i<product.images.length;i++){
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        };
        let imageslink=[];
        for(let i=0;i<images.length;i++){
            const mycloud=await cloudinary.v2.uploader.upload(images[i],{
                folder:"product",
            });
            imageslink.push({
                public_id:mycloud.public_id,
                url:mycloud.secure_url,
            })
        };
        req.body.images=imageslink;
    };
    product=await productdata.findByIdAndUpdate(req.params.id,req.body,{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
        message:"updated successfully"
    })
});

exports.deleteproductcontroller=catchasyncerror(async(req,res,next)=>{
    let product=await productdata.findById(req.params.id);
    if(!product){
        return next(new Errorhandler("product not found",404))
    };
    for(let i=0;i<product.images.length;i++){
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    };
    await product.remove();
    res.status(200).json({
        success:true,
        message:"deleted successfully"
    })
});


exports.productdetailcontroller=catchasyncerror(async(req,res,next)=>{
    let product=await productdata.findById(req.params.id);
    if(!product){
        return next(new Errorhandler("product not found",404))
    };
    res.status(200).json({
        success:true,
        product,
    })
});


exports.createproductreviewcontroller=catchasyncerror(async(req,res,next)=>{
    const {productid,comment,rating}=req.body;
    const review={
        user:req.user._id,
        name:req.user.name,
        rating:Number(rating),
        comment,
    };
    const product=await productdata.findById(productid);
    const isreviewed=product.reviews.find((rev)=>rev.user.toString()===req.user._id.toString());

    if(isreviewed){
        product.reviews.forEach((rev)=>{
            if(rev.user.toString()===req.user._id.toString())
            (rev.rating=rating),
            (rev.comment=comment)
        })
    }else{
        product.reviews.push(review);
        product.numofreview=product.reviews.length;
    };
    let sum=0;
    product.reviews.forEach((rev)=>{
        sum+=rev.rating;
    });
    product.ratings=sum/product.reviews.length;

    await product.save({validateBeforeSave:false});

    res.status(200).json({
        success:true,
    })

});

exports.getallproductreviewcontroller=catchasyncerror(async(req,res,next)=>{
    const product=await productdata.findById(req.query.id);
    if(!product){
        return next(new Errorhandler("product not found", 404))
    };
    res.status(200).json({
        success:true,
        reviews:product.reviews,
    })
});

exports.deletereviewcontroller=catchasyncerror(async(req,res,next)=>{
    const product=await productdata.findById(req.query.productid);

    if(!product){
        return next(new Errorhandler("product not found",404))
    };
    const reviews=product.reviews.filter((rev)=>rev._id.toString()!==req.query.id.toString());

    let sum=0;
    reviews.forEach((rev)=>{
        sum+=rev.rating
    });
    let ratings=0;
    if(reviews.length===0){
        ratings=0;
    }else{
        ratings=sum/reviews.length;
    };

    const numofreview=reviews.length;

    await productdata.findByIdAndUpdate(req.query.productid,{
        reviews,
        ratings,
        numofreview,
    },{
        new:true,
        runValidators:true,
        useFindAndModify:false,
    });
    res.status(200).json({
        success:true,
    })

})