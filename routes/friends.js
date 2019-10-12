const router = require('koa-router')();
const {
	getFriends,
	addFriends,
	updateFriends,
	delFriends
} = require('../controller/friends');
const {
	SuccessModel,
	ErrorModel
} = require('../model/resModel');

router.prefix('/api/friends')


router.get('/list', async function(ctx, next) {
	let name = ctx.query.name;
	const data = await getFriends(name);

	ctx.body = new SuccessModel(data)
});


router.post('/new', async function(ctx, next) {
	const body = ctx.request.body;
	const data = await addFriends(body)
	ctx.body = new SuccessModel(data);
})


router.post('/update', async function(ctx, next) {
	const val = await updateFriends(ctx.query.id, ctx.request.body);
	if (val) {
		ctx.body = new SuccessModel()
	} else {
		ctx.body = new ErrorModel('更新友链失败');
	}
});


router.post('/del', async function(ctx, next) {
	const val = await delFriends(ctx.query.id);
	if (val) {
		ctx.body = new SuccessModel()
	} else {
		ctx.body = new ErrorModel('删除友链失败');
	}
});


module.exports = router;
