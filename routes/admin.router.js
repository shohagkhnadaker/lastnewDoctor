const express=require("express")
const { getallDoctor, getallUser, makeDoctor, cencelDoctor, deleteUser } = require("../controlars/admin controler")
const route=express.Router()


// Add Doctor App

//Get All doctor
route.get("/admin/get-all-doctor",getallDoctor)
// get ALL user 
route.get("/admin/get-all-user",getallUser)
// change Statuse Approved  doctor
route.post("/admin/make-doctor",makeDoctor)
// cencel status doctor
route.post("/admin/cencel-doctor",cencelDoctor)
// Delete user 
route.post("/admin/delete-user",deleteUser)




module.exports=route