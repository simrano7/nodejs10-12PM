const routes = require("express").Router()

const categoryController = require("../apis/category/categoryController")
const productController = require("../apis/products/productController")
const studentController = require("../apis/student/studentController")
const userController = require("../apis/user/userController")
const courseController = require("../apis/course/courseController")
const multer = require("multer")
// routes.post("/category/add",categoryController.add)

routes.post("/user/login",userController.Login)
routes.post("/category/all",categoryController.getall)
// routes.post("/category/single",categoryController.getsingle)
routes.post("/product/single",productController.getSingle)
routes.post("/product/all",productController.getall)
routes.post("/product/getpagination",productController.getpagination)
routes.post("/student/register",studentController.register)

// routes.use(require("../middleware/tokenChecker"))
const productstorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './server/public/products')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix+file.originalname)
  }
})

const productupload = multer({ storage: productstorage })
routes.post("/product/add",productupload.single("image"),productController.add)
routes.post("/cat/add",categoryController.add)

routes.post("/product/update",productController.update)
routes.post("/product/delete",productController.deleteOne)
routes.post("/product/changestatus",productController.changeStatus)


routes.post("/student/getall",studentController.getall)
routes.post("/course/add",courseController.add)
routes.post("/course/single",courseController.getSingle)
routes.post("/course/all",courseController.getall)





module.exports = routes