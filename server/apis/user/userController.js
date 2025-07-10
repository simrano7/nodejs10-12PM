const userModel = require("./userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const secret = "123#@$"

const Login = (req,res)=>{
    var errMsgs = []
    if(!req.body.email){
        errMsgs.push("email is required!!")
    }
    if(!req.body.password){
        errMsgs.push("password is required!!")
    }
    if(errMsgs.length>0){
            res.send({
                status:422,
                success:false,
                message:errMsgs
            })
    }
    else{
        //login 
        userModel.findOne({email:req.body.email})
        .then((userdata)=>{
            // console.log("userdata is",userdata);
            if(userdata == null){
                res.send({
                    status:404,
                    success:false,
                    message:"user not found!!"
                })
            }
            else{
                //compare password
                bcrypt.compare(req.body.password,userdata.password,function(err,ismatch){
                    if(!ismatch){
                            res.send({
                                status:400,
                                success:false,
                                message:"wrong password!!"
                            })
                    }
                    else{
                        let payload = {
                                userId:userdata._id,
                                name:userdata.name,
                                email:userdata.email,
                                userType:userdata.userType

                        }
                        let token = jwt.sign(payload,secret,{expiresIn:"24hr"})
                        res.send({
                            status:200,
                            success:true,
                            message:"login successfully!!",
                            data:userdata,
                            token:token
                        })
                    }
                })


            }
            
        })
        .catch((err)=>{
            console.log("err is",err);
            res.send({
                status:500,
                success:false,
                message:"Something went wrong!!"
            })
        })
    }

}
const changepassword = (req,res)=>{
            var errMsgs = []
            if(!req.body.oldpassword)
                errMsgs.push("oldpassword is required!!")
            if(!req.body.newpassword)
                errMsgs.push("newpassword is required!!")
            if(!req.body.confirmpassword)
                errMsgs.push("confirmpassword is required!!")
            if(errMsgs.length>0){
                res.send({
                    status:422,
                    success:false,
                    message:errMsgs
                })
            }
            else{
                // change password logic
                if(req.body.newpassword == req.body.confirmpassword){
                        // next logic
                        userModel.findOne({_id:req.decoded.userId})
                        .then((userdata)=>{
                                    // console.log("userdata is",userdata);
                                bcrypt.compare(req.body.oldpassword,userdata.password,function(err,ismatch){
                                    if(!ismatch){
                                        res.send({
                                                status:422,
                                                success:false,
                                                message:"wrong password!!"
                                        })
                                    }
                                    else{
                                                // update password
                                                userdata.password = bcrypt.hashSync(req.body.newpassword,10)
                                                userdata.save()
                                                .then((updatedata)=>{
                                                          res.send({
                                                            status:200,
                                                            success:true,
                                                            message:"Password updated!!",
                                                            data:updatedata
                                                        })
                                                })
                                                  .catch((err)=>{
                                                        console.log("err is",err);
                                                        res.send({
                                                            status:500,
                                                            success:false,
                                                            message:"Something went wrong!!"
                                                        })
                                                    })

                                    }
                                })
                                    
                        })
                          .catch((err)=>{
                            console.log("err is",err);
                            res.send({
                                status:500,
                                success:false,
                                message:"Something went wrong!!"
                            })
                        })
                }
                else{
                    res.send({
                        status:422,
                        success:false,
                        message:"new password and confirm should be same!!"
                    })
                }
            }
}
module.exports = {Login,changepassword}