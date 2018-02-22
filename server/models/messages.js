var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
  name: String,
  message: String,
  timeStamp: Object
});

var Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
