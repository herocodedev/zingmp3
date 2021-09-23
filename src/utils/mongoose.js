const mongoose = require('mongoose');
// const URL = 'mongodb+srv://admin:123456789abc@vietnam.wwbzq.mongodb.net/test'
//mongodb://localhost:27017/test
// mongodb+srv://admin:123456789abc@vietnam.wwbzq.mongodb.net/test
//mongodb://localhost:27017/Project_1

const URL = process.env.DATABASE_URL

async function connect() {
    try {
        await mongoose.connect(URL, { useNewUrlParser: true });
        console.log('Connect Success!')
    } catch (err) {
        console.log('Connect Fail!')
    }

}

module.exports = { connect }