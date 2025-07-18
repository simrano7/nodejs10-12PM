const jwt = require("jsonwebtoken")
const secret = "123#@$"

module.exports =(req,res,next)=>{
        let token = req.headers["authorization"]
        if(!token){

                res.send({
                    status:404,
                    success:false,
                    message:"token is required!!"
                })
        }
        else{
            jwt.verify(token,secret,(err,data)=>{
                // console.log("data is",data);
                    if(!!err){
                            res.send({
                                status:403,
                                success:false,
                                message:"invalid token!!"
                            })
                    }
                    else{
                        req.decoded = data
                        next()
                    }
            })
        }
}