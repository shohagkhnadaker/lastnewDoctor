const errorMiddelwair=async(err,req,res,next)=>{

console.log(err);
return res.status(500).send({
    success:false,
    message:"something went Wrong",
    err
})

}

module.exports= errorMiddelwair