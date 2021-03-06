var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var PostSchema = new Schema({
  name: String,
  message: String,
  timeStamp: Object
});

var Post = mongoose.model("Post", PostSchema);
module.exports = Post;
