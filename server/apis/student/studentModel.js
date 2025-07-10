const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    name:{type:String,default:""},
    email:{type:String,default:""},
    education:{type:String,default:""},
    image:{type:String,default:""},
    DOB:{type:String,default:""},
    courseId:{type:mongoose.Schema.Types.ObjectId,ref:"courses"},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:"users"},
    contact:{type:String,default:""},
    status:{type:Boolean,default:true},
    createdAt:{type:Date,default:Date.now()},
})

module.exports = new mongoose.model("students",studentSchema)