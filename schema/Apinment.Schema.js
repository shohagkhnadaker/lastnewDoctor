const mongose=require('mongoose')

const apointSchema=mongose.Schema({
userId:{
    type:String,
    require:true
},
doctorId:{
    type:String,
    require:true
},
userInfo:{
    type:Object,
    require:true
},
doctorInfo:{
    type:Object,
    require:true
},
status:{
    type:String,
    default:"pending"
},
date:{
    type:String,
},
time:{
    type:Array,   
}

},{timestaps:true})



const ApoinmentScema=mongose.model("v2Apoinment",apointSchema)

module.exports=ApoinmentScema