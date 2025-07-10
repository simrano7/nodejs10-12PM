const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    name:{type:String,default:""},
    description:{type:String,default:""},
    image:{type:String,default:"noimage.jpg"},
    // categoryId:{type:mongoose.Schema.Types.ObjectId,ref:"categories"},
    categoryId:{type:mongoose.Schema.Types.ObjectId,ref:"categories"}, 
    price:{type:String,default:""},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()},
})
module.exports = new mongoose.model("products",productSchema)