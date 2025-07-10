const userModel = require("../apis/user/userModel")
const bcrypt = require("bcrypt")
const adminreg = ()=>{
    userModel.findOne({email:"admin@gmail.com"})
    .then((userdata)=>{
            if(userdata == null){
                    // insertion
                    let userObj = new userModel()
                    userObj.name = "admin"
                    userObj.email = "admin@gmail.com"
                    userObj.password = bcrypt.hashSync("admin@123",10)
                    userObj.userType = 1
                    userObj.save()
                    .then(()=>{
                        console.log("admin added successfully!!");
                        
                    })
                    .catch((err)=>{
                            console.log("something went wrong",err);
                            
                    })
            }
            else{
                // user already
                console.log("admin aleady exists!!");
                
            }
    })
    .catch((err)=>{
            console.log("something went wrong",err);
            
    })
}
module.exports = {adminreg}