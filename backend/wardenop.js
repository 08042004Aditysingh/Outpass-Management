const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WardenSchemaOp = new Schema({
    name:String,
  regNo:String,
  date:String,
  counselor:String,
  status:String,
  reason:String,
  branch:String,
  hostel:String
    }, { versionKey: false });

module.exports = mongoose.model('WardenOp', WardenSchemaOp);