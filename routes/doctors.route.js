const express=require("express")
const { addAPPlyDoctor, getHomeDoctor, getsingleDoctor, AddApoinmentDoctor, CheckAvilytyDoctor, DoctorApoinmentList, DoctorApoinmentstatusApprove, DoctorApoinmentstatusReject } = require("../controlars/doctors.conterolar")
const route=express.Router()


// Add Doctor Apply
route.post("/doctor/add-doctor",addAPPlyDoctor)
// Get All doctor for Home
route.get("/doctor/get-home-doctor",getHomeDoctor)
//Get Single doctor for apoinment
route.post("/doctor/get-single-doctor",getsingleDoctor)

//Apoinment Add
route.post("/doctor/Add-Apoinment-doctor",AddApoinmentDoctor)
// Check avility doctor 
route.post("/doctor/check-avility-doctor",CheckAvilytyDoctor)
// get Doctor Apoinment List
route.post("/doctor/get-doctor-apoinment-list",DoctorApoinmentList)
//Chane Aponment Status Approve
route.post("/doctor/change-doctor-apoinment-status-Approve",DoctorApoinmentstatusApprove)
//Chane Aponment Status reject

route.post("/doctor/change-doctor-apoinment-status-Reject",DoctorApoinmentstatusReject)



module.exports=route