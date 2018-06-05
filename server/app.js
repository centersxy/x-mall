var express = require('express');
var path = require('path');
var port = 3000;
// 加载数据库
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
// 创建应用
var app = express();

// 配置post
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({extended: false}));//post请求配置

//模块划分
app.use('/api/user', require('./routers/user'));
app.use('/api/goods', require('./routers/goods'));

// 连接MongoDB
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/X-mall', function (err) {
  if (err) {
    console.log(' connect err ')
  } else {
    app.listen(port,function () {
      console.log('connect success localhost:'+ port);
    });
  }
});
module.exports = app;


