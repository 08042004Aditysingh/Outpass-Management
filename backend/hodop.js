const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HodSchemaOp = new Schema({
    name: String,
    reason: String,
    status: String,
    branch: String,
    hostel: String,
    date:String
    }, { versionKey: false });

module.exports = mongoose.model('HodOp', HodSchemaOp);