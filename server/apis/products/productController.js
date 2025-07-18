const productModel = require("./productModel")
const {uploadImg} = require("../../utilities/helper")
const add = (req,res)=>{
    var errMsgs = []
    if(!req.body.name){
        errMsgs.push("name is required!!")
    }
    if(!req.body.description){
        errMsgs.push("description is required!!")
    }
    if(!req.files.length<0){
        errMsgs.push("images is required!!")
    }
    if(!req.body.categoryId){
        errMsgs.push("categoryId is required!!")
    }
    if(!req.body.price){
        errMsgs.push("price is required!!")
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
        productModel.findOne({name:req.body.name})
        .then(async(productdata)=>{
            console.log("product data is",productdata);
            if(productdata == null){
                //insertion
                let productObj = new productModel()
                productObj.name = req.body.name
                productObj.description = req.body.description
                // productObj.image = "products/"+req.file.filename
                // if(req.file){
                //         // cloud
                //         try{
                //                 let url =await uploadImg(req.file.buffer)
                //                 productObj.image = url
                //         }
                //         catch(err){
                //                 res.send({
                //                     status:400,
                //                     success:false,
                //                     message:"cloudnairy error!!"
                //                 })
                //         }
                // }
                let imageArr=[]
            for(let i=0;i<req.files?.length;i++){
                let url=await uploadImg(req.files[i]?.buffer);
                imageArr.push(url)            
            }
                 productObj.images=imageArr 
                productObj.categoryId = req.body.categoryId
                productObj.price = req.body.price
                productObj.save()
                .then((prodata)=>{
                     res.send({
                            status:200,
                            success:true,
                            messsage:"product data inserted!!",
                            data:prodata
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
            var totalproducts = await productModel.countDocuments()
            console.log("total products",totalproducts);
            
            productModel.find(req.body) 
            .populate("categoryId")           
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


// const getpagination = (req,res)=>{
//         var errMsgs = []
//         if(!req.body.pageno)
//             errMsgs.push("pageno is required!!")
//         if(!req.body.limit)
//             errMsgs.push("limit is required!!")
//         if(errMsgs.length>0){
//             res.send({
//                 status:422,
//                 success:false,
//                 message:errMsgs
//             })
//         }
//         else{
//             var pageno = req.body.pageno 
//             var limit = req.body.limit 
//             var skip = 0
//             if(pageno>1){
//                 skip = (pageno-1)*limit
//             }
//             productModel.find()
//              .populate("categoryId")
//             .skip(skip)
//             .limit(limit)
//             .then((prodata)=>{
//                   res.send({
//                     status:200,
//                     success:true,
//                     messsage:"Data loaded!!",
//                     data:prodata
//                 })  
//             })
//             .catch((err)=>{
//                  res.send({
//                     status:500,
//                     success:false,
//                     messsage:"Something went wrong!!"
//                 })
//             })
//         }
// }

const getpagination =(req,res)=>{
     var errMsgs = []
    if(!req.body.pageno){
        errMsgs.push("pageno is required!!")
    }
    if(!req.body.limit){
        errMsgs.push("limit is required!!")
    }
    if(errMsgs.length>0){
        res.send({
            status:422,
            success:false,
            message:errMsgs
        })
    }  
    else{
        // pagination
        var pageno = req.body.pageno;
        var limit = req.body.limit;
        var skip = 0
        if(pageno>1){
            skip = (pageno -1 )*limit
        }
        productModel.find()
        .skip(skip)
        .limit(limit)
        .then((productdata)=>{
            
               res.send({
                    status:200,
                    success:true,
                    messsage:"Data Loaded!!",
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
                productModel.findOne({_id:req.body._id})
                .populate("categoryId")
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
// const update = (req,res)=>{
//         var errMsgs = []
//         if(!req.body._id)
//             errMsgs.push("_id is required!!")
//         if(errMsgs.length>0){
//             res.send({
//                 status:422,
//                 success:false,
//                 message:errMsgs
//             })
//         }
//         else{
//             //update code (select,update)
//             productModel.findOne({_id:req.body._id})
//             .then((productdata)=>{
//                     // console.log("product data",productdata);
//                     if(productdata == null){
//                         res.send({
//                             status:404,
//                             success:false,
//                             messsage:"Data not found!!"
//                         })
//                     }
//                     else{
//                         //update
//                         if(req.body.name){
//                             productdata.name = req.body.name
//                         }
//                         if(req.body.description){
//                             productdata.description = req.body.description
//                         }
//                         if(req.body.image){
//                             productdata.image = req.body.image
//                         }
//                         if(req.body.category){
//                             productdata.category = req.body.category
//                         }
//                         if(req.body.price){
//                             productdata.price = req.body.price
//                         }
//                         productdata.save()
//                         .then((updatedata)=>{
//                             res.send({
//                                     status:200,
//                                     success:true,
//                                     messsage:"Data updated successfully!!",
//                                     data:updatedata
//                                 })
//                         })
//                         .catch((err)=>{
//                                     console.log("err is",err);
                                    
//                                     res.send({
//                                         status:500,
//                                         success:false,
//                                         messsage:"Something went wrong!!"
//                                     })
//         })

//                     }
                    
//             })
//             .catch((err)=>{
//                 console.log("err is",err);
                
//                 res.send({
//                     status:500,
//                     success:false,
//                     messsage:"Something went wrong!!"
//                 })
//         })

//         }
// }
// const deleteOne =(req,res)=>{
//      var errMsgs = []
//         if(!req.body._id)
//             errMsgs.push("_id is required!!")
//         if(errMsgs.length>0){
//             res.send({
//                 status:422,
//                 success:false,
//                 message:errMsgs
//             })
//         }
//         else{
//             //delete logic
//             productModel.findOne({_id:req.body._id})
//             .then((prodata)=>{
//                 if(prodata != null){
//                     //delete code 
//                     productModel.deleteOne({_id:req.body._id})
//                     .then((deletedproductdata)=>{
//                         res.send({
//                             status:200,
//                             success:true,
//                             message:"data deleted successfully!!",
//                             data:deletedproductdata
//                         })

//                     })
//                          .catch((err)=>{
//                             console.log("err is",err);
                            
//                             res.send({
//                                 status:500,
//                                 success:false,
//                                 messsage:"Something went wrong!!"
//                             })
//                         })


//                 }
//                 else{
//                     res.send({
//                     status:404,
//                     success:false,
//                     messsage:"Data not found!!"
//                 }) 
//                 }
//             })

//             .catch((err)=>{
//                 console.log("err is",err);
                
//                 res.send({
//                     status:500,
//                     success:false,
//                     messsage:"Something went wrong!!"
//                 })
//         })

//         }

// }
// soft delete

// const changeStatus = (req,res)=>{
//     var errMsgs = []
//         if(!req.body._id)
//             errMsgs.push("_id is required!!")
//         if(!req.body.status)
//             errMsgs.push("status is required!!")
//         if(errMsgs.length>0){
//             res.send({
//                 status:422,
//                 success:false,
//                 message:errMsgs
//             })
//         }
//         else{
//             //update status logic
//             productModel.findOne({_id:req.body._id})
//             .then((productdata)=>{
//                 if(productdata == null){
//                         res.send({
//                             status:404,
//                             success:false,
//                             message:"data not found!!"
//                         })
//                 }
//                 else{

//                         //update status
//                         productdata.status = req.body.status
//                         productdata.save()
//                         .then((updatedproduct)=>{
//                                 res.send({
//                                     status:200,
//                                     success:true,
//                                     message:"Status updated!!",
//                                     data:updatedproduct
//                                 })
//                         })
//                         .catch((err)=>{
//                                 console.log("err is",err);
//                                 res.send({
//                                     status:500,
//                                     success:false,
//                                     messsage:"Something went wrong!!"
//                                 })
//                             })
//                 }

//             })
//               .catch((err)=>{
//                 console.log("err is",err);
//                 res.send({
//                     status:500,
//                     success:false,
//                     messsage:"Something went wrong!!"
//                 })
//         })
//         }
// }

const deleteOne = (req,res)=>{
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
                productModel.findOne({_id:req.body._id})                
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
                    //   Hard 
                    productdata.deleteOne().then((deletedData)=>{
                         res.send({
                            status:200,
                            success:true,
                            message:"data Deleted successfull!!",
                            data:deletedData
                        })
                    }).catch(()=>{
                        res.send({
                            status:402,
                            success:false,
                            message:"Data Not Deleted successfull!!"
                        })
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



const changeStatus = (req,res)=>{
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
                productModel.findOne({_id:req.body._id})
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

                        productdata.status=!productdata.status
                       
                        productdata.save().then((changeStatus)=>{
                             res.send({
                            status:200,
                            success:true,
                            message:"data deleted!!",
                            data:changeStatus
                        })
                        }).catch(()=>{
                            res.send({
                            status:422,
                            success:false,
                            message:"data not deleted!!"
                            
                        })
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




const update = (req,res)=>{
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
                productModel.findOne({_id:req.body._id})
                .then(async(productdata)=>{
                    // console.log("product data",productdata);
                    if(productdata == null){
                         res.send({
                            status:404,
                            success:false,
                            message:"data not found!!"
                        })
                    }
                    else{

                        if(req.body.name){
                            productdata.name=req.body.name
                        }
                        if(req.body.description){
                            productdata.description=req.body.description
                        }
                        // if(req.file){
                        //     // productdata.image="products/"+req.file.filename
                        // }
                          if(req.file){
                        // cloud
                        try{
                                let url =await uploadImg(req.file.buffer)
                                productdata.image = url
                        }
                        catch(err){
                                res.send({
                                    status:400,
                                    success:false,
                                    message:"cloudnairy error!!"
                                })
                        }
                }
                        if(req.body.price){
                            productdata.price=req.body.price
                        }
                       
                        productdata.save().then((updatedData)=>{
                             res.send({
                            status:200,
                            success:true,
                            message:"data Updated!!",
                            data:updatedData
                        })
                        }).catch(()=>{
                            res.send({
                            status:422,
                            success:false,
                            message:"data not Updated!!"
                            
                        })
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






module.exports ={add,getSingle,update,deleteOne,changeStatus,getall,getpagination}