const mongoose=require("mongoose")
const kittySchema=new mongoose.Schema({
    shippinginfo:{
        address:{
            type:String,
            required:[true,"plz enter address detail"]
        },
        city:{
            type:String,
            required:true,
        },
        state:{
            type:String,
            required:true,
        },
        country:{
            type:String,
            required:true,
        },
        pincode:{
            type:Number,
            required:true,
        },
        phoneno:{
            type:Number,
            required:true,
        }
    },
    orderitem:[
        {
            product:{
                type:mongoose.Schema.ObjectId,
                ref:"product",
                required:true,
            },
            name:{
                type:String,
                required:true,
            },
            price:{
                type:Number,
                required:true,
            },
            quantity:{
                type:Number,
                required:true,
            },
            image:{
                type:String,
                required:true,
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        ref:"user",
        required:true,
    },
    paymentinfo:{
        id:{
            type:String,
            required:true,
        },
        status:{
            type:String,
            required:true,
        }
    },
    paidAt:{
        type:Date,
        default:Date.now,
    },
    itemprice:{
        type:Number,
        required:true,
    },
    taxprice:{
        type:Number,
        required:true,
        default:0,
    },
    shippingprice:{
        type:Number,
        required:true,
        default:0
    },
    totalprice:{
        type:Number,
        required:true,
        default:0
    },
    orderstatus:{
        type:String,
        default:"processing"
    },
    deliveredAt:Date,
    createdAt:{
        type:Date,
        default:Date.now,
    }

    
});
const orderdata=mongoose.model("order",kittySchema);
module.exports=orderdata;