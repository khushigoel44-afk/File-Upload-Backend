const mongoose = require("mongoose");

const fileupload = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imgurl: {
        type: String
    },
    tags: {
        type: String,
    },
    email: {
        type: String,
    },
})

module.exports = mongoose.model("schema", fileupload);