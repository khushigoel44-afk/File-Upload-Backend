const express = require("express");
const app = express();

require("dotenv").config();
const port = process.env.PORT || 3000

app.use(express.json());
const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp',
}));

const route = require("./routes/files.js");

app.use("/api/v1", route);

const dbconnect = require("./config/database.js");
dbconnect.connect();

const cloudinary = require("./config/cloudinary.js");
cloudinary.cloudinaryconnect();

app.listen(4000, (req, res)=>{
    console.log("Server up and running on port 4000");
})

app.get("/", (req, res)=>{
    res.send("This is the Default Homepage");
})

