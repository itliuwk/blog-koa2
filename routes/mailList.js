const router = require('koa-router')();
const {
	getMailList,
	addMailList,
	updateMailList,
	delMailList
} = require('../controller/mailList');
const {
	SuccessModel,
	ErrorModel
} = require('../model/resModel');

router.prefix('/api/mailList')


router.get('/list', async function(ctx, next) {
	let call = ctx.query.call;
	const data = await getMailList(call);

	ctx.body = new SuccessModel(data)
});


router.post('/new', async function(ctx, next) {
	const body = ctx.request.body;
	const data = await addMailList(body)
	ctx.body = new SuccessModel(data);
})


router.post('/update', async function(ctx, next) {
	const val = await updateMailList(ctx.query.id, ctx.request.body);
	if (val) {
		ctx.body = new SuccessModel()
	} else {
		ctx.body = new ErrorModel('更新通讯录失败');
	}
});


router.post('/del', async function(ctx, next) {
	const val = await delMailList(ctx.query.id);
	if (val) {
		ctx.body = new SuccessModel()
	} else {
		ctx.body = new ErrorModel('删除通讯录失败');
	}
});


module.exports = router;
