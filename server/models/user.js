var mongoose = require('mongoose');

var userModel = new mongoose.Schema({
  "userId": String,
  "userName": String,
  "userPwd": String,
  "name": String,
  "avatar": String,
  "createTime": {
    type: Date,
    default: Date.now
  }
});
module.exports = mongoose.model('user', userModel)
