const ApoinmentModule = require("../schema/Apinment.Schema")
const doctorModule = require("../schema/doctor.Schema")
const usermodule = require("../schema/users.schema")


const addAPPlyDoctor=async(req,res,next)=>{
try {
    
const Doctor= new doctorModule(req.body)
await Doctor.save()

const user= await usermodule.findOne({isAdmin:true})
const notification=user.notification

notification.push({
    type:"Doctor Apply requiest",
    message:`${Doctor.fistName} ${Doctor.lastName} sent a requiest for Doctor account`
})


await usermodule.findByIdAndUpdate(user._id,{notification})

res.status(200).send({
    success:true,
    message:"Request Successfull for doctor Account"
})


} catch (error) {
    next(error)
}
}

const getHomeDoctor=async(req,res,next)=>{
    try {

        const Alldoctor=await doctorModule.find({status:"Approved"})

 if (!Alldoctor) {
    next('Doctor not found')
 } 
 res.status(200).send({
    success:true,
    message:"get all doctor success",
    data:Alldoctor
 })

        
    } catch (error) {
        next(error)
    }
}


const getsingleDoctor=async(req,res,next)=>{
    try {
        
const doctor= await doctorModule.findOne({_id:req.body.doctorId})

if (!doctor) {
    next("Doctor didnt fount")
    
}

res.status(200).send({
    success:true,
    message:"Get single doctor Success",
    data:doctor
})

    } catch (error) {
        next()
    }
}


const AddApoinmentDoctor=async(req,res,next)=>{
try {
const doctor= await usermodule.findOne({_id:req.body.doctorInfo.userId})
const user= await usermodule.findOne({_id:req.body.userId})
// req.body.date=moment(req.body.date,'DD-MM-YYYY').toISOString();
// req.body.time=moment(req.body.time,'HH:mm').toISOString();


const newApoinmet= await new ApoinmentModule(req.body)
if (!newApoinmet) {
    next('apoinment send unsuccessfull')
}
await newApoinmet.save()




doctor.notification.push({
    message:`you have new Apoinment request from ${user.name}`,
    onClickpath:`/doctor-appointment-list/${doctor.userId}`

})
  await  doctor.save()

res.status(200).send({
    success:true,
    message:"success apoinment"
})


} catch (error) {
   next(error) 
}
}

const CheckAvilytyDoctor=async(req,res,next)=>{
try {
 
//    const date= req.body.date=moment(req.body.date,'DD-MM-YYYY').toISOString();
//     const fromTime=moment(req.body.time,"HH:mm").subtract(1,'hours').toISOString()
//     const toTime=moment(req.body.time,"HH:mm").add(1,'hours').toISOString()

    const doctorId=req.body.doctorId
 const  avilitydoctor=await ApoinmentModule.find({$and:[
   { doctorId:doctorId},
    {date:req.body.date},
    {time:req.body.time}
]}) 
if (!avilitydoctor) {
    return res.status(200).send({
        success:false,
        message:'doctor is not avilable at this time'
    })
} 
  res.status(200).send({
    success:true,
    message:'doctor is avilable..!'
})


} catch (error) {
    console.log(error);
}
}


const DoctorApoinmentList=async(req,res,next)=>{
    try {

       const doctorid=await doctorModule.findOne({userId:req.body.doctorId})
if (doctorid) {
    const doctorApointList=await ApoinmentModule.find({doctorId:doctorid._id})
    if (!doctorApointList) {
       return res.status(200).send({
        success:false,
        message:"apoinment are not founded"
       })  
    }
    
    res.status(200).send({
        success:true,
        message:"Doctor apoinment list get successfully",
        data:doctorApointList
    })
     
} else {
    const userApoinmentlist=await ApoinmentModule.find({userId:req.body.doctorId})
    if (!userApoinmentlist) {
       return res.status(200).send({
        success:false,
        message:"apoinment are not founded"
       })  
    }
    
    res.status(200).send({
        success:true,
        message:"user apoinment list get successfully",
        data:userApoinmentlist
    })
     
    
}

    } catch (error) {
        console.log(error);
        next(error)
    }
}

const DoctorApoinmentstatusApprove= async(req,res,next)=>{
    try {
        const apoinmet=await ApoinmentModule.findByIdAndUpdate({_id:req.body.id},{status:"Approved"})

if (!apoinmet) {
    return res.status(202).send({
        success:false,
        message:"apinment update failed"
    })
}

res.status(200).send({
    success:true,
    message:"Status update successfull"
})


    } catch (error) {
        next(error)
    }
}


const DoctorApoinmentstatusReject= async(req,res,next)=>{
    try {
        const apoinmet=await ApoinmentModule.findByIdAndUpdate({_id:req.body.id},{status:"pending"})

if (!apoinmet) {
    return res.status(202).send({
        success:false,
        message:"apinment update failed"
    })
}

res.status(200).send({
    success:true,
    message:"Status Rejected successfull"
})


    } catch (error) {
        next(error)
    }
}

module.exports={
    DoctorApoinmentstatusReject,
    DoctorApoinmentstatusApprove,
    CheckAvilytyDoctor,
    addAPPlyDoctor,
    getHomeDoctor,
    getsingleDoctor,
    AddApoinmentDoctor,
    DoctorApoinmentList,
}