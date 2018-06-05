const express = require('express');
const router = express.Router();
const goodsModel = require('./../models/goods');

router.get('/', (req, res, next) => {
  let sort = req.query.sort || '';
  let page = +req.query.page || 1;
  let pageSize = +req.query.pageSize || 10;
  let priceGt = +req.query.priceGt || ""; // 大于
  let priceLt = +req.query.priceLt || ""; // 小于
  let skip = (page - 1) * pageSize;
  let params = {}; // 定义查询的对象
  //筛选值颠倒只有一个值时候
  if (priceGt || priceLt) {
    if (priceGt && priceLt) {
      if (priceGt > priceLt) {
        var g = priceGt;
        var l = priceLt;
        priceGt = l
        priceLt = g
      }
      params = {
        "productPrice": {
          $gt: priceGt,
          $lt: priceLt
        }
      }
    } else {
      params = {
        "productPrice": {
          $gt: priceGt || 0,
          $lt: priceLt || 9999
        }
      }
    }
  }
  // sq
  const goods = goodsModel.find(params).skip(skip).limit(pageSize);
  // 未sort商品不按次序排列
  sort && goods.sort({"productPrice": sort});
  goods.exec(function (err, doc) {
    if (err) {
      res.json({
        code: '1',
        message: err.message,
        result: ''
      });
    } else {
      res.json({
        code: '0',
        message: 'suc',
        result: {
          count: doc.length,
          list: doc
        }
      })
    }
  })
});
module.exports = router
