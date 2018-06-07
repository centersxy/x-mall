const mongoose = require('mongoose');

const userModel = new mongoose.Schema({
  "userId": String,
  "userName": String,
  "userPwd": String,
  "name": String,
  "avatar": String,
  "createTime": {
    type: Date,
    default: Date.now
  },
  cartList: [
    {
      "productId": String,
      "productName": String,
      "productPrice": Number,
      "productNum": Number,
      "productImgBig": String,
      "checked":String,
      //选中的数量
    }
  ]
});
module.exports = mongoose.model('user', userModel);
