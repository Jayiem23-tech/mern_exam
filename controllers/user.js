
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../config/keys')

exports.viewhin = (req,res)=>{
    res.send("hello") 
}
// normal_user_signup /////////////////////////////////////////////////////
    exports.signup = (req,res)=>{
        const {
            fname
            ,mname
            ,lname
            ,email
            ,contact
            ,approved
        } = req.body
    
        if(
            !fname ||
            !mname ||
            !lname ||
            !email ||
            !contact 
            // !approved
        ){ 
            console.log({
                fname
                ,mname
                ,lname
                ,email
                ,contact
                ,approved})
            return res.status(422).json({error:"Fill up required Fields"})
        }
        User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                return res.status(422).json({error:"User Already Exists with that email"})
            }
            const user = new User({
                fname
                ,mname
                ,lname
                ,email
                ,contact
                ,approved
            })
            user.save()
            .then(user=>{
                return res.status(200).json({message:"saved successfully"})
            })
            .catch(err=>{
                console.log(err)
            })
        })
        .catch(err=>{
            console.log(err)
        })
    },

// normal_user_signup ////////////////////////////////////////////////////////
    exports.signup_admin = (req,res)=>{
        const {
            fname
            ,mname
            ,lname
            ,email
            ,contact
            ,approved
            ,pass
        } = req.body
    
        if(
            !fname ||
            !mname ||
            !lname ||
            !email ||
            !contact ||
            !pass
            // !approved
        ){ 
            
            return res.status(422).json({error:"Fillup required Fields"})
        }

        User.findOne({email:email})
        .then((savedUser)=>{
            if(savedUser){
                // console.log(savedUser)
                return res.status(422).json({error:"User Already Exists with that email"})
                
            }
            bcrypt.hash(pass,12)
            .then(hashedpass=>{
                const user = new User({
                    fname
                    ,mname
                    ,lname
                    ,email
                    ,contact
                    ,approved
                    ,pass:hashedpass
                })
                user.save()
                .then(user=>{
                    return res.status(200).json({message:"saved successfully"})
                })
                .catch(err=>{
                    console.log(err)
                })
            })
            
        })
        .catch(err=>{
            console.log(err)
        })

        // user.all()
    },


// signin admin ////////////////////////////////////////////////////////
    exports.signin = (req,res)=>{
        const {email,pass} = req.body
        if(!email || !pass){
            return res.status(422).json({error:"Invalid Email or password"})
        }
        User.findOne({email:email})
        .then(savedUser=>{
            if(!savedUser){
                return res.status(422).json({error:"Invalid Email or password"})
            }
            bcrypt.compare(pass,savedUser.pass)
            .then(doMatch=>{
                if(doMatch){
                    // res.json({message:"successfully signed in"})
                    const token = jwt.sign({_id:savedUser._id},JWT_SECRET)
                    const {_id,name,email} = savedUser
                    res.json({token,user:{_id,name,email}})
                }
                else{
                    return res.status(422).json({error:"Invalid Email or password"})  
                }
            })
            .catch(err=>{
                console.log(err)
            })
        })
    },

    exports.showAllApproval = (req,res)=>{
        User.find({approved:'false',pass:''},{})
        .then(users=>{
            
            res.json(users)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    exports.showAllApproved = (req,res)=>{
        User.find({approved:'true'},{})
        .then(users=>{
          
                res.json(users)
        })
        .catch(err=>{
            console.log(err)
        })
    }

    exports.approvedUser = (req,res)=>{
        // console.log(req.body.)
        User.findById(req.body._id, function(err, result) {
            if (!result)
                return res.status(404).json({error:err})  
            else {
              result.approved = true;
          
              result.save(function(err) {
                if (err)
                  console.log('error')
                else
                  console.log('success')
              });
            }
          });

       
    }
