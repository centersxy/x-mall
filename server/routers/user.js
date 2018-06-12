var express = require('express');
var router = express.Router();
var userModel = require('./../models/user')
var fs = require('fs')

// 使用 async await
router.get('/', async function (req, res) {
  const data = await fs.readFileSync('./../package.json');
  res.send(data.toString());
})
//register
router.post('/register', async (req, res) => {
  /*
  *  获取数据
  *  用户名是否存在
  *  密码是否一致
  *  邮箱或手机号是否正确
  * */
  const {userName, userPwd} = req.body;
  try {
    const doc = await userModel.findOne({userName});
    if (doc) {
      res.json({
        code: '1',
        message: '已经存在'
      })
    } else {
      userModel.create({
        avatar: 'http://osc9sqdxe.bkt.clouddn.com/default-user-avatar.png',
        name: '皮皮虾',
        userName,
        userPwd
      });
      res.json({
        code: '0',
        message: 'suc'
      });
    }
  } catch (e) {
    res.json({
      code: '1',
      message: e.message
    })
  }
});
//login
router.post('/login', async (req, res) => {
  const {userName, userPwd} = req.body;
  try {
    const doc = await userModel.findOne({userName, userPwd});
    if (doc) {
      const {userId, avatar, name, createTime} = doc;
      res.cookie('userId', userId, {
        path: '/',
        maxAge: 1000 * 60 * 60
      });
      res.json({
        code: '0',
        message: 'suc',
        result: {
          avatar,
          name,
          createTime
        }
      })
    } else {
      res.json({
        code: '1',
        message: '用户名或密码错误'
      })
    }
  } catch (e) {
    res.json({
      code: '1',
      message: e.message
    })
  }
});

router.get('/logOut', (req, res) => {
  res.cookie('userId', '', {
    path: '/',
    maxAge: -1
  });
  res.json({
    code: '0',
    message: 'logout',
    result: ''
  })
});

// 获取用户信息
router.get('/userInfo', async (req,res) => {
  const userId = req.cookies.userId;
  try {
    if (userId) {
      let {name, avatar,createTime} = await userModel.findOne({userId});
      res.json({
        code: '0',
        message: 'suc',
        result:{
          userInfo: {
            name,avatar,createTime
          }
        }
      })
    }else {
      res.json({
        code: '1',
        message: '用户未登录',
        result: ''
      })
    }
  }catch (err) {
    res.json({
      code: '1',
      message: err.message,
      result: ''
    })
  }
})
/*
  // 获取购物车
*  查看用户是否登录
*  获取用户模型数据
* */
router.post('/cartList', async (req, res) => {
  const userId = req.cookies.userId;
  if (userId) {
    try {
      const doc = await userModel.findOne({userId: userId});
      const {cartList} = doc
      res.json({
        code: '0',
        message: 'suc',
        result: {
          count: cartList.length,
          list: cartList
        }
      })
    } catch (err) {
      res.json({
        code: '1',
        message: err.message,
        result: ''
      })
    }
  } else {
    res.json({
      code: '1',
      message: '用户未登录',
      result: ''
    })
  }
});

/*
* 删除当前商品
* 根据用户id 商品id 找到对应goods
* 执行$pull
*
* 传入的id是mongod自创的objectId
* */
router.post('/delGoods', function (req, res, next) {
  const userId = req.cookies.userId,
    productId = req.body.productId;
  userModel.update(
    {
      userId
    },
    {
      $pull: {
        cartList: {
          'productId': productId
        }
      }
    }, function (err, doc) {
      if (err) {
        res.json({
          code: '1',
          message: err.message,
          result: ''
        });
        return;
      } else {
        res.json({
          code: '0',
          message: 'suc',
          result: ''
        });
      }
    }
  )
});

/*
*  购物车数量
*  传入的id是mongod自创的objectId
* */
router.post('/editCart', function (req, res, next) {
  const userId = req.cookies.userId,
    productId = req.body.productId,
    productNum = req.body.productNum,
    checked = req.body.checked;
  userModel.update({userId, "cartList.productId": productId},
    {
      "cartList.$.productNum": productNum,
      "cartList.$.checked": checked
    }, function (err, doc) {
      if (err) {
        res.json({
          code: '1',
          message: err.message,
          result: ''
        });
        return;
      } else {
        res.json({
          code: '0',
          message: 'suc',
          result: ''
        });
      }
    })
});

/*
*  全选功能
*  查找模型、获取是否选择
*  更新模型、保存数据
* */
router.post('/editCheckAll', async (req, res) => {
  const userId = req.cookies.userId,
    checkAll = req.body.checkAll? '1': '0';
  try {
    const userDoc = await userModel.findOne({userId});
    if (userDoc) {
      userDoc.cartList.forEach((item) =>{
        item.checked = checkAll
      })
    }
    // 重新保存
    userDoc.save((err) => {
      if (err) {
        res.json({
          code: '1',
          message: err.message,
          result: ''
        });
        return;
      } else {
        res.json({
          code: '0',
          message: 'suc',
          result: ''
        });
      }
    })
  } catch (err) {
    res.json({
      code: '0',
      message: err.message,
      result: ''
    });
  }
});
module.exports = router
