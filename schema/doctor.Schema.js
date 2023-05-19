const mongoose=require("mongoose")


const DoctoeSchema=mongoose.Schema({

userId:{
    type:String,
    require:[true,'userId is required']
},
fistName:{
    type:Object,
    require:[true,'fast name is required']
},lastName:{
    type:Object,
    require:[true,'last name is required']
},phone:{
    type:Object,
    require:[true,'phone is required']
},experience:{
    type:Object,
    require:[true,'experience is required']
},fee:{
    type:Object,
    require:[true,'fee is required']
},
status:{
    type:String,
    default:"pending"
},
timing:{
    type:Array,
    require:[true,'timing is required']
},


})


const doctorscema=mongoose.model("V2doctors",DoctoeSchema)

module.exports=doctorscema


