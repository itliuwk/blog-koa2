const router = require('koa-router')();
const {
	getNote,
	addNote,
	updateNote,
	delNote
} = require('../controller/note');
const {
	SuccessModel,
	ErrorModel
} = require('../model/resModel');

router.prefix('/api/note')


router.get('/list', async function(ctx, next) {
	let title = ctx.query.title;
	console.log(title)
	const data = await getNote(title);

	ctx.body = new SuccessModel(data)
});


router.post('/new', async function(ctx, next) {
	const body = ctx.request.body;
	const data = await addNote(body)
	ctx.body = new SuccessModel(data);
})


router.post('/update', async function(ctx, next) {
	const val = await updateNote(ctx.query.id, ctx.request.body);
	if (val) {
		ctx.body = new SuccessModel()
	} else {
		ctx.body = new ErrorModel('更新笔记失败');
	}
});


router.post('/del', async function(ctx, next) {
	const val = await delNote(ctx.query.id);
	if (val) {
		ctx.body = new SuccessModel()
	} else {
		ctx.body = new ErrorModel('删除笔记失败');
	}
});


module.exports = router;
