const router = require('koa-router')();
const {
	SuccessModel,
	ErrorModel
} = require('../model/resModel');
const fs = require('fs');
const path = require('path');
router.prefix('/api');
const env = process.env.NODE_ENV;

let host = ''
if (env === 'dev') {
	host = 'http://localhost:8000'
} else {
	host = 'http://106.52.232.16:8000'
}

/**
 * @param {Object} ctx
 * @param {Object} next
 * 上传文件
 */
router.post('/uploadfiles', async function(ctx, next) {
	// 上传单个文件
	const file = ctx.request.files.file; // 获取上传文件
	// 创建可读流
	const reader = fs.createReadStream(file.path);
	let filePath = path.join(__dirname, '../public/files/') + `/${file.name}`;
	// 创建可写流
	const upStream = fs.createWriteStream(filePath);
	// 可读流通过管道写入可写流
	reader.pipe(upStream);

	return ctx.body = new SuccessModel('上传成功')

});


/**
 * @param {Object} ctx
 * @param {Object} next
 * 获取目录下所有东西
 */
router.get('/getFiles', async function(ctx, next) {

	await new Promise(function(reslove, reject) {
		fs.readdir('./public/files/', function(err, picFiles) {
			if (err) ctx.throw(err)
			let arr = []
			picFiles.forEach(function(value, index) {
				arr.push(host + '/files/' + value)
			})
			reslove(arr)

		})
	}).then(data => {
		ctx.body = new SuccessModel(data)
	})


});


module.exports = router;
