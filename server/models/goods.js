var mongoose = require('mongoose');

var goodsModel = new mongoose.Schema({
    "productId": String,
    "productName": String,
    "productPrice": Number,
    "productNum": Number,
    "productImgSmall": Array,
    "productImgBig": String,
    "productSubTitle": String,
    "productDesc": String,
    "productMsg": Object
});

module.exports = mongoose.model('goods',goodsModel);
