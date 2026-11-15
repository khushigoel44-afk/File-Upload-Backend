const models = require("../models/schema.js");
const cloudinary = require("cloudinary").v2;

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

function isFileTypeSupported(type, supportedtype){
    return supportedtype.includes(type);
}

async function uploadfiletocloudinary(file, folder, quality){
    const options = {folder,
        resource_type: "auto",
    };

    if (quality)
        options.quality = quality;
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}

exports.uploadimages = async (req, res)=>{
    try{
        const {name, email, tag} = req.body;
        console.log(name, email, tag);

        const file = req.files.ImageFile;
        console.log(file);

        const supportedtype = ["jpeg", "jpg", "png"];
        const filetype = file.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(filetype, supportedtype)){
            return res.status(400).json({
                success:false,
                message: "File Type Not Supported!",
            })
        }

        const response = await uploadfiletocloudinary(file, "Uploading_Imapge_Khushi", 30);
        console.log(response);

        const data = await models.create({
            name, 
            email,
            tag,
            imageurl: response.secure_url,
        })
        console.log(data);

        res.status(200).json({
            success: true,
            data: response.secure_url,
            message: "File Successfully uploaded to cloudinary!",
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        })
    }
}

exports.videoupload = async (req, res)=>{
    try{
        const {name, email, tag} = req.body;
        console.log(name, email, tag);

        const video = req.files.videofile;
        console.log(video);

        const supportedtype = ["mp4", "mov"];
        const filetype = video.name.split(".")[1].toLowerCase();

        if(!isFileTypeSupported(filetype, supportedtype)){
            return res.status(400).json({
                success: false,
                message: "Video Type not supported!", 
            })
        }

        const filesize = 5*1024*1024;
        if(video.size>filesize){
            return res.status(400).json({
                success: false,
                message: "The size should be less than 5MB",
            })
        }

        const response = await uploadfiletocloudinary(video, "Uploading_Imapge_Khushi");
        console.log(response);

        const data = await models.create({
            email, 
            name,
            tag,
            imageurl: response.secure_url,
        })

        res.status(200).json({
            success: true,
            data: response.secure_url, 
            message: "The video file is uploaded successfully to cloudinary!",
        })
    }
    catch(error){
        console.log(error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
        })
    }
}