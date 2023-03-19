const winston= require('winston')
const mongoose= require('mongoose')
const config= require('config')

module.exports= function(){
    const db= config.get('db')
mongoose.connect('mongodb+srv://shittutemidayo16:Eternal-life-144@cluster0.vbp0d3y.mongodb.net/?retryWrites=true&w=majority')
.then(()=>winston.info(`Connected to ${db}...`))
}

    // "db": "mongodb://localhost:27017/events",
