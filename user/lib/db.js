const mongoose = require('mongoose');

function connect(){
    console.log(process.env.MONGO_URL)
    mongoose.connect(process.env.MONGO_URL).then(() => {
        console.log('User Service Connected to Database')
    }).catch(err => {
        console.error(err)
    })
} 

module.exports = connect