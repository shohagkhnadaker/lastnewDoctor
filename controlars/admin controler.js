const doctorscema = require("../schema/doctor.Schema")
const usermodule = require("../schema/users.schema")

const getallDoctor=async(req,res,next)=>{
    try {
    const Alldoctors= await doctorscema.find()
    
    
    res.status(200).send({
        success:true,
        message:"get all doctors successfull",
        data:Alldoctors
    })
        
    } catch (error) {
       next(error) 
    }
    }


    const getallUser=async(req,res,next)=>{
        try {
        const users= await usermodule.find()
        
        
        res.status(200).send({
            success:true,
            message:"get all user successfull",
            data:users
        })
            
        } catch (error) {
           next(error) 
        }
        }

        const makeDoctor=async(req,res,next)=>{
            try {
        const id=req.body.doctorId
                const doctor=await doctorscema.findByIdAndUpdate(id,{status:"Approved"})

      const user=await usermodule.findOne({_id:doctor.userId})
const notification=user.notification
      notification.push({
type:'doctor account request accepted',
message:"Congratulation..! Your doctor account request accepted..!"
      })
user.isDoctor=true

await user.save()
 res.status(200).send({
                    success:true,
                    message:"Approved successfull"
                })
        
        
            } catch (error) {
               next(error) 
            }
        }


        const cencelDoctor=async(req,res,next)=>{
            try {
        const id=req.body.doctorId
                const doctor=await doctorscema.findByIdAndUpdate(id,{status:"cancel"})

      const user=await usermodule.findOne({_id:doctor.userId})
const notification=user.notification
      notification.push({
type:'doctor account  cancelled...!',
message:"oppps..! Your doctor account  cancelled..!"
      })
user.isDoctor=false

await user.save()
 res.status(200).send({
                    success:true,
                    message:"cencel successfull"
                })
        
        
            } catch (error) {
               next(error) 
            }
        }



const deleteUser=async(req,res,next)=>{
            try {
                
await usermodule.deleteOne({_id:req.body.userId})
res.status(200).send({
    success:true,
    message:"user delete successfull",
})

            } catch (error) {
                next(error)
            }
        }


    module.exports={getallDoctor,getallUser,makeDoctor,cencelDoctor,deleteUser}