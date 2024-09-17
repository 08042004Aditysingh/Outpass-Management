const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ConcellorOp = new Schema({
    name: String,
    reason: String,
    status: String,
    branch: String,
    hostel: String,
    startDate:String,
    endDate:String
    }, { versionKey: false });

module.exports = mongoose.model('CouncellorOp', ConcellorOp);