const router = require('koa-router')();
const {
	getStatistics,
	updateStatistics
} = require('../controller/statistics');
const {
	SuccessModel,
	ErrorModel
} = require('../model/resModel');

router.prefix('/api/statistics')


router.get('/detail', async function(ctx, next) {
	const data = await getStatistics();

	ctx.body = new SuccessModel(data)
});





router.get('/update', async function(ctx, next) {
	const val = await updateStatistics();
	if (val) {
		ctx.body = new SuccessModel()
	} else {
		ctx.body = new ErrorModel('更新统计失败');
	}
});




module.exports = router;
