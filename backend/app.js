const express=require("express");
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config.env"})
};
const Errormiddleware=require("./middleware/err")
const bodyParser=require("body-parser");
const cookieParser=require("cookie-parser")
const fileUpload=require("express-fileupload");
const path=require("path")

const user=require("./routes/userroute");
const product=require("./routes/productroute");
const order=require("./routes/orderroute");
const payment=require("./routes/paymentroute")

const app=express();

app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(cookieParser());
app.use(fileUpload())

app.use("/api",user);
app.use("/api",product)
app.use("/api",order);
app.use("/api",payment);


app.use(express.static(path.join(__dirname,"../frontend/build")));
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"))
});


app.use(Errormiddleware)

module.exports=app;
