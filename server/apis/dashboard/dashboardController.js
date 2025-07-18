const categoryModel = require("../category/categoryModel")
const productModel = require("../products/productModel")
const studentModel = require("../student/studentModel")
const userModel = require("../user/userModel")
const dashboard =async (req,res)=>{
        let totalCategories = 0
        let totalProducts = 0
        let totalActiveProducts = 0
        let totalInactiveProducts = 0
        let totalStudents = 0
        let totalUsers = 0
      await  categoryModel.countDocuments()
        .then((totalcat)=>{
                totalCategories = totalcat
        })

      await  productModel.countDocuments()
        .then((totalpro)=>{
                totalProducts = totalpro
        })
      await  productModel.countDocuments({status:true})
        .then((totalpro)=>{
                totalActiveProducts = totalpro
        })
      await  productModel.countDocuments({status:false})
        .then((totalpro)=>{
                totalInactiveProducts = totalpro
        })
       await studentModel.countDocuments()
        .then((totalstu)=>{
                totalStudents = totalstu
        })
       await userModel.countDocuments()
        .then((totaluser)=>{
                totalUsers = totaluser
        })
        res.send({
            status:200,
            success:true,
            message:"Dashboard loaded!!",
            totalcategory:totalCategories,
            totalstudents:totalStudents,
            totalusers:totalUsers,
            totalActiveProducts,
            totalInactiveProducts,
            totalProducts
        })
}

module.exports = {dashboard}