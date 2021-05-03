const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    fname:{
        type:String,
        required:true
    },
     mname:{
        type:String,
        required:true
    },
    lname:{
       type:String,
       required:true
    },
    email:{
      type:String,
      required:true
    },
    pass:{
    type:String,
    required:false
    },
    contact:{
        type:String,
        required:true
    },
    approved:{
        type:Boolean,
        required:true
    }

})

mongoose.model("User",userSchema)