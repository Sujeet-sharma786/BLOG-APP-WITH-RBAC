const mongoose = require('mongoose')
const dotenv = require('dotenv').config();
const dbConnect = ()=>{
    const connect = mongoose.connect(process.env.MONGODB_URI,);
    // console.log(`Database connected : ${connet}`)
    console.log("database connected");
}


module.exports = dbConnect;