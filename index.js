

const express = require("express")
const app = express()
const studentdata = require("./data")
const filterstu =  studentdata.filter((el)=>{
            // console.log(el.marks);
            if(el.marks>=80){
                // console.log(el);
                return el;
                
            }
            
})
// console.log("student data",studentdata);

const productdata = require("./productdata")
const db = require("./server/config/db")
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(express.static(__dirname+("/server/public/")))
const port = 5000;

const seeder = require("./server/config/seeder")
seeder.adminreg()

const routes = require("./server/routes/apiroutes")
app.use("/apis",routes)

const adminroutes = require("./server/routes/adminRoutes")
app.use("/admin",adminroutes)

const shirtdata = productdata.filter((el,index)=>{
    // console.log("el is ",el.category);
    if(el.category == "Shirts"){
        return el
    }
})
// console.log("shirt data",shirtdata);
const shoesdata = productdata.filter((el,index)=>{
    // console.log("el is ",el.category);
    if(el.category == "Shoes"){
        return el
    }
    

})
// console.log("Shoes data",shoesdata);


app.get("/",(req,res)=>{
    res.send({
        status:200,
        success:true,
        message:"Welcome to server!!"
    })
})

app.get("/about",(req,res)=>{
    res.json({
         status:200,
        success:true,
        message:"about api call!!"
    })
})
app.get("/gallery",(req,res)=>{
    res.json({
         status:200,
        success:true,
        message:"gallery api call!!"
    })
})
app.get("/shoesdata",(req,res)=>{
    res.send({
        status:200,
        success:true,
        message:"Shoes data loaded!!",
        data:shoesdata
    })
})

app.post("/shirtdata",(req,res)=>{
    console.log("req check",req.query.Name);
    
    res.send({
        status:200,
        success:true,
        message:"shirt data loaded!!",
        course:req.query.course,
        name:req.query.Name
       
    })
})
app.get("/studentdata",(req,res)=>{
      res.send({
            status:200,
            success:true,
            message:"student data loaded!!",
            data:filterstu
        })
})
app.post("/paramsdata/:name",(req,res)=>{
    console.log(req.params.name);
    
        res.send({
            status:200,
            success:true,
            message:"params api",
            data:req.params.name
        })
})  


app.listen(port,(err)=>{
    if(err){
        console.log("error ",err);
        
    }
    else{
        console.log("server connected!",port);
        
    }
})

