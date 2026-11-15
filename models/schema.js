const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

const fileupload = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageurl: {
        type: String
    },
    tag: {
        type: String,
    },
    email: {
        type: String,
    },
})

fileupload.post("save", async function(doc){
    try{
        console.log("Doc includes: ", doc);
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            auth: {
                user: process.env.MAIL_USER,
                pass: process.env.MAIL_PASS,
            }
        })
        let info = await transporter.sendMail({
            from: "Magguuu No. 2",
            to: doc.email,
            subject: "File Upload Status",
            html: `<h1>File (Image/Video) Uploaded Successfully</h1> <p>View Here: <a href="${doc.imageurl}">${doc.imageurl}</a></p>`
        })
        console.log(info);
    }
    catch(error){
        console.log(error.message);
    }
})

module.exports = mongoose.model("schema", fileupload);