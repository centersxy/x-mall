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
router.get('/login', async (req, res) => {
  const {userName, userPwd} = req.body;
  try {
    const doc = userModel.findOne({userName, userPwd});
    if (doc) {
      const {userId, avatar, name} = doc;
      res.json({
        code: '0',
        message: 'suc',
        result: {
          avatar,
          name
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

module.exports = router
