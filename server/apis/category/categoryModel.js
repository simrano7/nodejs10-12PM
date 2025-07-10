const mongoose = require("mongoose")

const categorySchema = new mongoose.Schema({
    name:{type:String,default:""},
    description:{type:String,default:""},
    image:{type:String,default:""},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()},
})

module.exports = new mongoose.model("categories",categorySchema)