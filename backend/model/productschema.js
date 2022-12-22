const mongoose=require("mongoose");
const kittySchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"plz enter product name"],
        trim:true,
    },
    description:{
        type:String,
        required:[true,"plz enter product description"]
    },
    price:{
        type:Number,
        required:[true,"plz enter product price"],
        maxLength:[8,"price cannot exceeded more then 8 characters"]
    },
    ratings:{
        type:Number,
        default:0
    },
    numofreview:{
        type:Number,
        default:0,
    },
    category:{
        type:String,
        required:true,
    },
    stock:{
        type:Number,
        required:[true,"plz enter stock value"],
        default:1,
        maxLength:[4,"stock cannot exceeded more then 4 characters"]
    },
    images:[
        {
            public_id:{
                type:String,
                required:true,
            },
            url:{
                type:String,
                required:true,
            }
        }
    ],
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"user",
                required:true,
            },
            name:{
                type:String,
                required:true,
            },
            rating:{
                type:Number,
                required:true,
            },
            comment:{
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
    createdAt:{
        type:Date,
        default:Date.now,
    }

});
const productdata=mongoose.model("product",kittySchema);
module.exports=productdata;