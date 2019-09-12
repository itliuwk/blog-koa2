const router = require('koa-router')();
const {getList,getListCount,getClassify,getClassifyCount, getDetail, newBlog, updateBlog, delBlog} = require('../controller/blog');
const {SuccessModel, ErrorModel} = require('../model/resModel');
const loginCheck = require('../middleware/loginCheck');

router.prefix('/api/blog');

router.get('/list', async function (ctx, next) {
    let author = ctx.query.author || '';
    let username = ctx.query.username || '';
    const keyword = ctx.query.keyword || '';
    const page = ctx.query.page || '';
    const total = ctx.query.total || '';
    const classify = ctx.query.classify || '';

    if (username == null) {
        ctx.body = new ErrorModel('未登录');
        return false;
    }
    author = author || username;
    const listData = await getList(author, keyword,classify,page,total);

    ctx.body = new SuccessModel(listData);
});


router.get('/list/count', async function (ctx, next) {
    let author = ctx.query.author || '';
    let username = ctx.query.username || '';
    const keyword = ctx.query.keyword || '';

    author = author || username;
    const count = await getListCount(author, keyword);

    ctx.body = new SuccessModel(count);
});



router.get('/listClass', async function (ctx, next) {
    const page = ctx.query.page || '';
    const total = ctx.query.total || '';
    const classify = ctx.query.classify || '';


    const listData = await getClassify(classify,page,total);

    ctx.body = new SuccessModel(listData);
});

router.get('/listClass/count', async function (ctx, next) {
    const page = ctx.query.page || '';
    const total = ctx.query.total || '';
    const classify = ctx.query.classify || '';


    const listData = await getClassifyCount(classify,page,total);

    ctx.body = new SuccessModel(listData);
});




router.get('/detail', async function (ctx, next) {
    const data = await getDetail(ctx.query.id);
    ctx.body = new SuccessModel(data);
});


router.post('/new', async function (ctx, next) {
    const body = ctx.request.body;
    // body.author = ctx.session.username;
    const data = await newBlog(body);
    ctx.body = new SuccessModel(data);
});


router.post('/update', async function (ctx, next) {
    const val = updateBlog(ctx.query.id, ctx.request.body);
    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('更新博客失败');
    }
});


router.post('/del', async function (ctx, next) {
    const author =  ctx.request.body.username;
    const val = await delBlog(ctx.query.id, author);
    if (val) {
        ctx.body = new SuccessModel()
    } else {
        ctx.body = new ErrorModel('删除博客失败');
    }
});


module.exports = router;
