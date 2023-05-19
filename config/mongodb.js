
require('dotenv').config()
const mongoose=require('mongoose')
const { async } = require('rxjs')

const db=process.env.DB_URL

const mongodb=async()=>{
try {
    mongoose.connect(db).then(()=>{
        console.log('DB id Connected');
    }).catch(()=>{
        console.log('database Problem');
    })

} catch (error) {
    console.log(error);
}

}


module.exports=mongodb