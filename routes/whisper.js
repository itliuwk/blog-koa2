const router = require('koa-router')();
const {
	getWhisper,
	addWhisper,
	updateWhisper,
	delWhisper
} = require('../controller/whisper');
const {
	SuccessModel,
	ErrorModel
} = require('../model/resModel');

router.prefix('/api/whisper')


router.get('/list', async function(ctx, next) {
	let whisper = ctx.query.whisper;
	const data = await getWhisper(whisper);

	ctx.body = new SuccessModel(data)
});


router.post('/new', async function(ctx, next) {
	const body = ctx.request.body;
	const data = await addWhisper(body)
	ctx.body = new SuccessModel(data);
})


router.post('/update', async function(ctx, next) {
	const val = await updateWhisper(ctx.query.id, ctx.request.body);
	if (val) {
		ctx.body = new SuccessModel()
	} else {
		ctx.body = new ErrorModel('更新微语失败');
	}
});


router.post('/del', async function(ctx, next) {
	const val = await delWhisper(ctx.query.id);
	if (val) {
		ctx.body = new SuccessModel()
	} else {
		ctx.body = new ErrorModel('删除微语失败');
	}
});


module.exports = router;
