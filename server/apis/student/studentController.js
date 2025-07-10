const userModel = require("../user/userModel")
const studentModel = require("./studentModel")
const bcrypt = require("bcrypt")
const nodemailer = require("nodemailer")

const register = (req,res)=>{
    var errMsgs = []
    if(!req.body.name){
        errMsgs.push("name is required!!")
    }
    if(!req.body.email){
        errMsgs.push("email is required!!")
    }
    if(!req.body.password){
        errMsgs.push("password is required!!")
    }
    if(!req.body.education){
        errMsgs.push("education is required!!")
    }
    if(!req.body.image){
        errMsgs.push("image is required!!")
    }
    if(!req.body.DOB){
        errMsgs.push("DOB is required!!")
    }
    if(!req.body.contact){
        errMsgs.push("contact is required!!")
    }
    if(!req.body.courseId){
        errMsgs.push("courseId is required!!")
    }
    if(errMsgs.length>0){
        res.send({
            status:422,
            success:false,
            message:errMsgs
        })
    }
    else{
        //insertion
        userModel.findOne({email:req.body.email})
        .then((userdata)=>{
            console.log("userdata",userdata);
            if(userdata == null){
                //new user add
                let userObj  = new userModel()
                userObj.name = req.body.name
                userObj.email = req.body.email
                userObj.password =bcrypt.hashSync(req.body.password,10)  
                userObj.userType = 3
                userObj.save()
                .then((newuserdata)=>{
                    let studentObj = new studentModel()
                    studentObj.userId = newuserdata._id
                    studentObj.name = req.body.name
                    studentObj.email = req.body.email
                    studentObj.education = req.body.education
                    studentObj.image = req.body.image
                    studentObj.courseId = req.body.courseId
                    studentObj.DOB = req.body.DOB
                    studentObj.contact = req.body.contact
                    studentObj.save()
                    .then( async(studentdata)=>{  
                        
                        const transporter = nodemailer.createTransport({
                            host: "smtp.gmail.com",
                            port: 587,
                            secure: false, // true for port 465, false for other ports
                            auth: {
                            user: "youremail",
                            pass:"your password",
                            },
                        });
                        const info = await transporter.sendMail({
                            from: '"Simran 👻" <youremail>', // sender address
                            to: req.body.email, // list of receivers
                            subject: "Thanks for Register ✔", // Subject line
                            text: "Welcome to our site!!", // plain text body
                            html: "<b>Welcome to our site!!</b>", // html body
                        });
                        res.send({
                            status:200,
                            success:true,
                            message:"student Register!!!",
                            data:studentdata,
                            userdata:newuserdata
                            
                        })    
                    })
                    .catch((err)=>{
                        console.log(err);

                        res.send({
                            status:500,
                            success:false,
                            message:"internel server error!!"
                        })
                    })


                })
                  .catch((err)=>{
                        console.log(err);
                        
                        res.send({
                            status:500,
                            success:false,
                            message:"internel server error!!"
                        })
                    })
                


            }
            else{
                res.send({
                status:422,
                success:false,
                message:"user already exists with same email!!"
            })
            }
            
        })
        .catch((err)=>{
            console.log(err);
            
            res.send({
                status:500,
                success:false,
                message:"internel server error!!"
            })
        })
    }
}
const getall = (req,res)=>{
    studentModel.find(req.body)
    .populate("userId")
    .populate("courseId")
     .then((studentdata)=>{  
            res.send({
                status:200,
                success:true,
                message:"data loaded!!!",
                data:studentdata
                
            })    
        })
        .catch((err)=>{
            console.log(err);
            
            res.send({
                status:500,
                success:false,
                message:"internel server error!!"
            })
        })


    

}


module.exports = {register,getall}