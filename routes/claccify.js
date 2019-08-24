const router = require('koa-router')();
const {getClassify,getClassifyLabel} = require('../controller/classify');
const {SuccessModel, ErrorModel} = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

router.prefix('/api/classify');

router.get('/list', async function (ctx, next) {

    const listData = await getClassify();

    ctx.body = new SuccessModel(listData);
});


router.get('/value', async function (ctx, next) {
    const value = ctx.query.value || '';
    const listData = await getClassifyLabel(value);
    ctx.body = new SuccessModel(listData);
});


module.exports = router;
