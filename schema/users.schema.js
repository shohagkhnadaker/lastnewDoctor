const mongoose=require('mongoose')


const userSchema=mongoose.Schema({
name:{
    type:String,
    require:[true,'Name is required']
},
password:{
    type:String,
    require:[true,'password is required']
},
isDoctor:{
    type:Boolean,
    default:false
},
isAdmin:{
    type:Boolean,
    default:false
},
notification:{
    type:Array,
    default:[]

},
seennotification:{
    type:Array,
    default:[]
}
},{timestaps:true})


const usermodule=mongoose.model('V2users',userSchema)
module.exports=usermodule
