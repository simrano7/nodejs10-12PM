const categoryModel = require("./categoryModel")

const add = (req,res)=>{
    let categoryObj = new categoryModel()

    categoryObj.name = req.body.name
    categoryObj.description = req.body.description
    categoryObj.image = "category/"+req.file.filename
    categoryObj.save().then((categorydata)=>{
            res.send({
                 status:200,
                success:true,
                message:"Category added successfully!!",
                data:categorydata
            })
    })
    .catch((err)=>{
       
            res.send({
                status:500,
                success:false,
                message:"Internel server error!!"
            })
    })
}


const getall = (req,res)=>{
    categoryModel.find()
    .then((categorydata)=>{
        console.log("category data",categorydata);
        
        res.send({
            status:200,
            success:true,
            message:"Data loaded!!",
            data:categorydata
        })
    })
    .catch((err)=>{
        console.log(err);
        
        res.send({
            statuss:500,
            success:false,
            message:"Internel Server error!!"
        })
    })
}
const getsingle =(req,res)=>{
    categoryModel.findOne({_id:req.body._id})
    .then((catdata)=>{
            res.send({
                status:200,
                success:true,
                messsage:"Single category loaded!!",
                data:catdata
            })
    })
    .catch((err)=>{
        console.log(err);
        
        res.send({
            statuss:500,
            success:false,
            message:"Internel Server error!!"
        })
    })


}

module.exports = {add,getall,}