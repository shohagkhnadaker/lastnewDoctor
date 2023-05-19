const express = require("express")
const app = express()
const cours=require('cors')
const morgan=require('morgan')
const bodyparser=require("body-parser")
const passport=require('passport')
const path =require("path")

// MIddelware
app.use(cours())
app.use(bodyparser.urlencoded({ extended: false }))
app.use(bodyparser.json())
app.use(morgan("dev"))
app.use(passport.initialize())

require('./config/passport')
// require routes
const userRoute=require('./routes/user.route')
const DoctorRoute=require("./routes/doctors.route")
const errorMiddelwair = require("./Error/errorMiddelwaire")
const AdminRoute=require('./routes/admin.router')

// ROUTES
app.use(userRoute)
app.use(DoctorRoute)
app.use(AdminRoute)
// autunticaton
app.get('/profile', passport.authenticate('jwt', { session: false }),
    function(req, res) {
       return res.send({
            success:true,
            user:{
                id:req.user._id,
                username:req.user.name,
                isAdmin:req.user.isAdmin,
            }
        });

        
    }
);


// Validation Middelwaire

app.use(errorMiddelwair)


app.use(express.static(path.join(__dirname, './my-app/build')))

app.get("*",function (req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))
})



module.exports=app