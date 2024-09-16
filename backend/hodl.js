const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HodSchemaL = new Schema({
    name: String,
    reason: String,
    status: String,
    branch: String,
    hostel: String,
    startDate:String,
    endDate:String
    }, { versionKey: false });

module.exports = mongoose.model('HodL', HodSchemaL);