const  mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LoginSchema = new Schema({
    email: String,
    password:String,
}, { versionKey: false })


module.exports = mongoose.model('Login', LoginSchema);