const express = require('express')
const { RejisterUser, loginUser, SingelUser, moveNotification ,deleteNotification, profileGet, profileUpdate} = require('../controlars/user.controlar')
const route = express.Router()

//Rejister ||post
route.post('/user/register', RejisterUser)

// LOGIN || POSt
route.post('/user/login', loginUser)


// get singele user
route.post('/user/get-singel-user',SingelUser)

// MOve Notification
route.post('/user/move-notification',moveNotification)
// Delete notification
route.post('/user/delete-notification',deleteNotification)

// Profile get route 
route.post('/user/get-profile',profileGet)

// Profile Update 
route.post('/user/update-profile',profileUpdate)




module.exports = route