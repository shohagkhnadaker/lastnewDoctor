require('dotenv').config()
const bcrypt=require('bcrypt')
const userModule=require('../schema/users.schema')
const jwt = require('jsonwebtoken');
const doctorModule=require('../schema/doctor.Schema')

// ADD USER||POST
const RejisterUser=async(req,res,next)=>{
try {
const ExistName= await userModule.findOne({name:req.body.name})

if (ExistName) {
    // return res.status(200).send({
    //     success:false,
    //     message:'user Alredy Exist'
    // })
   return next('name is required')
}
const password = req.body.password;
const salt = await bcrypt.genSalt(10)
const haspassword = await bcrypt.hash(password, salt)

req.body.password = haspassword

const user=await new userModule({
    name:req.body.name,
    password:req.body.password
})
await user.save()

res.status(200).send({
    success:true,
    message:"Rejister successfully",
    data:user
})



    
} catch (error) {
 next(error)
}
}



// Login user || post
const loginUser=async(req,res)=>{
try {
    
    const user= await userModule.findOne({name:req.body.name})
    if (!user) {
        return res.status(200).send({
            success:false,
            message:"Name and Password Wrong"
        })
    }  
    
    
    
    const mathPassword=await bcrypt.compare(req.body.password ,user.password)
    if (!mathPassword) {
    return res.status(200).send({
            success:false,
            message:"Name and Password Wrong"
        })
    }  
    
    const token = jwt.sign({id:user._id },process.env.SEKRET_KEY,{expiresIn:"1d"});


 res.status(200).send({
        success:true,
        message:'Login Successfull..!',
        data:user,
        token:'Bearer ' + token,
        userId:user._id
    })
    

} catch (error) {
    res.status(500).send({
        success:false,
        message:"something went Wrong",
        error
       })
}

}

// GET SINGLE USER
const SingelUser=async(req,res,next)=>{
try {
const user=await userModule.findOne({_id:req.body.id})
    
user.password=undefined


if (!user) {
  return next("profile user not found")  
}

res.status(200).send({
    success:true,
    message:"user get successfull",
    data:user
})

} catch (error) {
next (error)
}
}


const moveNotification=async(req,res,next)=>{
try {
    

const user=await userModule.findOne({_id:req.body.userId})
const notification=user.notification
const seennotification=user.seennotification

seennotification.push(
    ...notification)

user.notification=[]
const updateuser=await user.save()
res.status(200).send({
   success:true,
   message:"notification remove success",
   data:updateuser 
})

} catch (error) {
    next(error)
}

}


const deleteNotification=async(req,res,next)=>{
    try {
        
const user=await userModule.findOne({_id:req.body.userId})

user.seennotification=[]

await user.save()
res.status(200).send({
    success:true,
    message:"delete notification successfull"
    
})        
    } catch (error) {
        next(error)
    }
}


const profileGet=async(req,res,next)=>{
    try {
        const profile=await doctorModule.findOne({userId:req.body.userId})
if (!profile) {
    return next('user not found')
}
        
res.status(200).send({
    success:true,
    message:"get profile success",
    data:profile
})

    } catch (error) {
        next(error)
    }
}


const profileUpdate=async(req,res,next)=>{
try {    
const doctor=await doctorModule.findOneAndUpdate({userId:req.body.userId},req.body)

if (!doctor) {
   return next('something wrong')
}

res.status(200).send({
    success:true,
    message:'update successfull',
data:doctor
})

} catch (error) {
 next(error)   
}

}


module.exports={profileUpdate,RejisterUser,loginUser,SingelUser,moveNotification,deleteNotification,profileGet}