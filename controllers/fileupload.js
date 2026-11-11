const models = require("../models/schema.js");

exports.localfileupload = (req, res)=>{
    try{
        // extract the file
        const file = req.files.file;
        console.log(file);

        // provide the path to copy the file on the server
        const path = __dirname + "/files/" + Date.now() + `.${file.name.split(".")[1]}`
        console.log(path);

        //copy the file to the path using move function
        file.mv(path, (err)=>{
            console.log(err)
        })

        res.status(200).json({
            success: true,
            message: "The file was copied successfully to the path!",
        })
    }
    catch(error){
        console.log(error);
    }
}