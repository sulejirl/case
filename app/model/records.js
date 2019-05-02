var mongoose   = require('mongoose');
var Schema     = mongoose.Schema;

var recordSchema  = new Schema({
	
    key:String,
    value:String,
    createdAt:Date,
    counts:[Number]
});
module.exports = mongoose.model('Record', recordSchema);