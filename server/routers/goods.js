const express = require('express');
const router = express.Router();
const goodsModel = require('./../models/goods'),
      userModel = require('./../models/user')
router.get('/goodsList', (req, res, next) => {
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

router.post('/addCart', async (req, res) => {
  let userId = req.cookies.userId
  let {productId, productNum = 1} = req.body
  if (userId) {
    try{
      /*
      *  1.获取用户信息
      *  2.查看购物车是否存在该商品
      *  3.没有则添加 反之则++
      * */
      const userDoc = await userModel.findOne({userId:userId});
      if (userDoc) {
        let hasGoods  = false;
        // have goods
        if (userDoc.cartList.length) {
          userDoc.cartList.forEach((item) => {
            if (item.productId === productId) {
              item.productNum += productNum;
              hasGoods = true;
            }
          })
        }

        // no goods

        if (!userDoc.cartList.length || !hasGoods) {
          const goodsDoc = await goodsModel.findOne({productId: productId});
          // 只需添加购物车对应的数据模型
          // 默认选中
          let doc = {
            "productId": goodsDoc.productId,
            "productImgBig": goodsDoc.productImgBig,
            "productName": goodsDoc.productName,
            "productPrice": goodsDoc.productPrice,
            "productNum": productNum,
            "checked": "1"
          }
          userDoc.cartList.push(doc)
        }
        userDoc.save(() => {
          res.json({
            code: '0',
            message: 'suc add',
            result: ''
          })
        })
      }
    }catch (err) {
      res.json({
        code: '1',
        message: err.message,
        result: ''
      })
    }
  }else {
    res.json({
      code: '1',
      message: '用户未登录',
      result: ''
    })
  }
});
module.exports = router
