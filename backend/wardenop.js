const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WardenSchemaOp = new Schema({
    name: String,
    reason: String,
    status: String,
    branch: String,
    hostel: String,
    date:String
    }, { versionKey: false });

module.exports = mongoose.model('WardenOp', WardenSchemaOp);