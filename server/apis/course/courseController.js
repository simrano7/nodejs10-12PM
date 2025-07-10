const courseModel = require("./courseModel")


const add = (req,res)=>{
    var errMsgs = []
    if(!req.body.name){
        errMsgs.push("name is required!!")
    }
    if(!req.body.description){
        errMsgs.push("description is required!!")
    }
    if(!req.body.image){
        errMsgs.push("image is required!!")
    }
    if(errMsgs.length>0){
        res.send({
            status:422,
            success:false,
            message:errMsgs
        })
    }
    else{
        //insert
        // console.log("data insertion code");
        courseModel.findOne({name:req.body.name})
        .then((productdata)=>{
            console.log("product data is",productdata);
            if(productdata == null){
                //insertion
                let courseObj = new courseModel()
                courseObj.name = req.body.name
                courseObj.description = req.body.description
                courseObj.image = req.body.image
                courseObj.save()
                .then((data)=>{
                     res.send({
                            status:200,
                            success:true,
                            messsage:"course data inserted!!",
                            data:data
                        })

                })
                 .catch((err)=>{
                        res.send({
                            status:500,
                            success:false,
                            messsage:"Something went wrong!!"
                        })
        })

            }
            else{
                //data already exists
            res.send({
                status:422,
                success:false,
                message:"Data already exists!!"
            })
            }
            
        })
        .catch((err)=>{
            res.send({
                status:500,
                success:false,
                messsage:"Something went wrong!!"
            })
        })
        
    }

}
const getall = async(req,res)=>{
            var totalproducts = await courseModel.countDocuments()
            console.log("total products",totalproducts);
            courseModel.find()
            .then((productdata)=>{
                res.send({
                    status:200,
                    success:true,
                    messsage:"Data loaded!!",
                    data:productdata
                })
            })
            .catch((err)=>{
                res.send({
                    status:500,
                    success:false,
                    messsage:"Something went wrong!!"
                })
            })

}

const getSingle = (req,res)=>{
            var errMsgs = []
            if(!req.body._id)
                errMsgs.push("_id is required")
             if(errMsgs.length>0){
                    res.send({
                        status:422,
                        success:false,
                        message:errMsgs
                    })
            }
            else{
                //find data
                courseModel.findOne({_id:req.body._id})
                .then((productdata)=>{
                    // console.log("product data",productdata);
                    if(productdata == null){
                         res.send({
                            status:404,
                            success:false,
                            message:"data not found!!"
                        })
                    }
                    else{
                        res.send({
                            status:200,
                            success:true,
                            message:"data loaded!!",
                            data:productdata
                        })
                    }
                    

                })
                 .catch((err)=>{
                        res.send({
                            status:500,
                            success:false,
                            messsage:"Something went wrong!!"
                        })
                    })
            }
}


module.exports = {add,getall,getSingle}