const mongooose = require("mongoose")
// mongooose.connect("mongodb://localhost:27017/june_10_12")
mongooose.connect("mongodb://127.0.0.1:27017/june_10_12")
.then(()=>{
    console.log("database connected!!");
    
})
.catch((err)=>{
    console.log("err while connecting db",err);
    
})