const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    name : {type: String, required: true},
    discription:{type:String},
    category:{type:String},
    image:{type:String,required:true},
    location : {type: String, required: true},
    postedAt:{type:String,required:true},
    price : {type: String, required: true}, 
})

const PostModel = mongoose.model("postmodel", postSchema)

module.exports = { PostModel }