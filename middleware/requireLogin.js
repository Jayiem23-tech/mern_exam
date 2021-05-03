const jwt = require('jsonWebToken')
const {JWT_SECRET} = require('../config/keys')
const mongoose = require('mongoose')
const User = mongoose.model("User")

module.exports = (req,res,next)=>{
    const {authorization} = req.headers
    if(!authorization){
        // unauthorize
        return res.status(401).json({error:"you need to login first!s"})
    }
    const token = authorization.replace("Bearer ","")
    // console.log(token)
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        console.log(err)
        if(err){
            return res.status(401).json({error:"you need to login first!ss"})
        }

        const {_id} = payload
        console.log(_id)
        User.findById(_id)
        .then(userdata=>{
            req.user = userdata
            console.log(req.user)
        })
        next()
    })

    // console.log(authorization)
}