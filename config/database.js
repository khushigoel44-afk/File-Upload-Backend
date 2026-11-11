const mongoose = require("mongoose");
require("dotenv").config();

exports.connect = ()=>{
    mongoose.connect(process.env.DATABASE_URL)
    .then(()=>{
        console.log("Mongodb connect established successfully on port 4000");
    })
    .catch(()=>{
        console.log("Some Error occurred in Mongodb connection!");
        process.exit(1);
    })
}