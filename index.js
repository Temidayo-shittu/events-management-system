const config= require('config')
const Joi= require('joi')
const express= require('express')
const mongoose= require('mongoose')
const organisers= require('./routes/organisers')
const events= require('./routes/events')
const attendees= require('./routes/attendees')
const reports= require('./routes/reports')
const login= require('./routes/login')
const app= express()


if (!config.get('jwtPrivateKey')){
    console.error('FATAL ERROR: jwtPrivateKey is not defined.')
    process.exit(1)
}


mongoose.connect('mongodb://localhost:27017/events')
.then(()=>console.log('Connected to mongoDB...'))
.catch((err)=>console.error('Could not connect to mongoDB...'))

app.use(express.json())
app.use('/organisers',organisers)
app.use('/events',events)
app.use('/attendees',attendees)
//app.use('/events/reports',reports)
app.use('/login',login)


const port= process.env.PORT || 3000
app.listen(port,()=>console.log(`Listening on port ${port}....`))