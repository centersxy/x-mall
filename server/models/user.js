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
  ],
  //用户地址
  "addressList":[
    {
      "addressId": String,
      "name": String,
      "streetName": String,
      "photo": Number,
      "isDefault": Boolean
    }
  ]
});
module.exports = mongoose.model('user', userModel);
