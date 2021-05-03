const express = require('express')
const mongoose = require('mongoose')
const app = express()
const PORT  = process.env.PORT || 5000
const {MONGOURI} = require('./config/keys')


require('./models/user')

app.use(express.json())
app.use(require('./routes/auth'))


mongoose.connect(MONGOURI,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})


mongoose.connection.on('connected',()=>{
    console.log("connected to mongo yeah")
})
mongoose.connection.on('error',(err)=>{
    console.log("error connected",err)
})

if(process.env.NODE_ENV == "production")
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(PATH.resolve(__dirname,'client','build','index.html'))
    })

app.listen(PORT,()=>{
    console.log('server is running on ',PORT)
})