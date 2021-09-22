const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://saket20k:22671barca@cluster0.xtam6.mongodb.net/escay-rooms'

mongoose.connect(mongoURL, {useUnifiedTopology: true, useNewUrlParser: true})

var connection = mongoose.connection

connection.on('error', ()=>{
    console.log('MongoDB connection failed')
})

connection.on('connected', ()=>{
    console.log('MongoDB connection successful')
})


module.exports = mongoose