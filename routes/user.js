const router = require('koa-router')();
const {login,Register} = require('../controller/user');

const {SuccessModel, ErrorModel} = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');


router.prefix('/api/user');

router.post('/login', async function (ctx, next) {
    let {username, password} = ctx.request.body;
    const data = await login(username, password);
    if (data.username) {
        // ctx.session.username = data.username;
        // ctx.session.realname = data.realname;
        ctx.body = new SuccessModel(data);
        return false;
    }

    ctx.body = new ErrorModel('登录失败');
});


router.post('/register',async function (ctx,next) {
    let {username, password,realname} = ctx.request.body;
    const val = await Register(username, password,realname);
    if (val) {
        ctx.body = new SuccessModel('创建账号成功')
    } else {
        ctx.body = new ErrorModel('账号已存在,请换一个账号注册!');
    }
});


module.exports = router;
