const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const JointDirectorSchemaL = new Schema({
    name: String,
    regNo: String,
    startDate: String,
    endDate:String,
    counselor: String,
    status:String,
    reason:String,
    branch:String,
    hostel:String
    }, { versionKey: false });

module.exports = mongoose.model('JointDirectorL', JointDirectorSchemaL);