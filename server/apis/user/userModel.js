const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{type:String,default:""},
    email:{type:String,default:""},
    password:{type:String,default:""},
    userType:{type:Number,default:3}, //1-admin,2-teacher,3-student
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()},
})

module.exports = new mongoose.model("users",userSchema)