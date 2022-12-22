const app=require("./app");
if(process.env.NODE_ENV!=="PRODUCTION"){
    require("dotenv").config({path:"backend/config.env"})
};
const cloudinary=require("cloudinary")

const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.mongodb);
  
};

cloudinary.config({
  cloud_name:process.env.cloudinary_name,
  api_key:process.env.cloudinary_api_key,
  api_secret:process.env.cloudinary_api_secret,
})


app.listen(process.env.port,()=>{
    console.log(`server is running on port ${process.env.port}`)
})