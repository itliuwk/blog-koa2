const router = require('koa-router')();
const {
	getList,
	getListCount,
	getListIds,
	getClassify,
	getClassifyCount,
	getDetail,
	newBlog,
	updateBlog,
	delBlog
} = require('../controller/blog');
const {
	SuccessModel,
	ErrorModel
} = require('../model/resModel');

const {
	html_entity_decode,
	writeFileRecursive
} = require('../model/utils');
const loginCheck = require('../middleware/loginCheck');

router.prefix('/api/blog');
//获取模板引擎实例
var template = require('art-template');
var fs = require('fs');
const Koa = require('koa')
const app = new Koa()

router.get('/list', async function(ctx, next) {
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
	const listData = await getList(author, keyword, classify, page, total);

	ctx.body = new SuccessModel(listData);
});


router.get('/list/count', async function(ctx, next) {
	let author = ctx.query.author || '';
	let username = ctx.query.username || '';
	const keyword = ctx.query.keyword || '';

	author = author || username;
	const count = await getListCount(author, keyword);

	ctx.body = new SuccessModel(count);
});



router.get('/listClass', async function(ctx, next) {
	const page = ctx.query.page || '';
	const total = ctx.query.total || '';
	const classify = ctx.query.classify || '';
	const keyword = ctx.query.keyword || '';

	const listData = await getClassify(classify, keyword, page, total);

	ctx.body = new SuccessModel(listData);
});

router.get('/listClass/count', async function(ctx, next) {
	const page = ctx.query.page || '';
	const total = ctx.query.total || '';
	const keyword = ctx.query.keyword || '';
	const classify = ctx.query.classify || '';


	const listData = await getClassifyCount(classify, keyword, page, total);

	ctx.body = new SuccessModel(listData);
});




router.get('/detail', async function(ctx, next) {
	const data = await getDetail(ctx.query.id);
	ctx.body = new SuccessModel(data);
});


router.post('/new', async function(ctx, next) {
	const body = ctx.request.body;
	// body.author = ctx.session.username;
	const data = await newBlog(body);
	ctx.body = new SuccessModel(data);
});


router.post('/update', async function(ctx, next) {
	const val = updateBlog(ctx.query.id, ctx.request.body);
	if (val) {
		ctx.body = new SuccessModel()
	} else {
		ctx.body = new ErrorModel('更新博客失败');
	}
});


router.post('/del', async function(ctx, next) {
	const author = ctx.request.body.username;
	const val = await delBlog(ctx.query.id, author);
	if (val) {
		ctx.body = new SuccessModel()
	} else {
		ctx.body = new ErrorModel('删除博客失败');
	}
});


router.get('/detailTurnHtml', async function(ctx, next) {
	let ids = await getListIds();
	fs.readFile('./article/detail.html', function(err, data) {
		if (err) {
			return console.log('读取文件失败了')
		}
		for (var i = 0; i < ids.length; i++) {
			function a(i) {
				getDetail(ids[i]).then(res => {
					res.content = html_entity_decode(res.content);
					var ret = template.render(data.toString(), res)
					//  会在当前目录下创建article 目录 并创建detail_[i] 文件 并写入ret中的内容
					writeFileRecursive(`../../sxitw.cn/detail_${ids[i]}.html`, ret, (err) => {
						if (err) console.error(err);
						console.info("write success");
						ctx.body = new SuccessModel(ids[i])
					});
				});
			};
			a(i);
		}
	});
});



router.get('/detailHtml', async function(ctx, next) {
	fs.readFile('./article/detail.html', function(err, data) {
		if (err) {
			return console.log('读取文件失败了')
		}
		getDetail(ctx.query.id).then(res => {
			res.content = html_entity_decode(res.content);
			var ret = template.render(data.toString(), res)
			//  会在当前目录下创建article 目录 并创建detail_[i] 文件 并写入ret中的内容
			//  ../../sxitw.cn  是线上前端目录的路径，生成的html 放在前端项目文件里
			writeFileRecursive(`../../sxitw.cn/detail_${ctx.query.id}.html`, ret, (err) => {
				if (err) console.error(err);
				ctx.body = new SuccessModel("write success")
			});
		});
	});
});

module.exports = router;
