const router = require('koa-router')();
const {SuccessModel, ErrorModel} = require('../model/resModel');
const fs = require('fs');
const path = require('path');
router.prefix('/api');

router.post('/uploadfiles', async function (ctx, next) {
// 上传单个文件
    const file = ctx.request.files.file; // 获取上传文件
    // 创建可读流
    const reader = fs.createReadStream(file.path);
    let filePath = path.join(__dirname, '../public/images/') + `/${file.name}`;
    // 创建可写流
    const upStream = fs.createWriteStream(filePath);
    // 可读流通过管道写入可写流
    reader.pipe(upStream);
    let body = {
        src: 'http://localhost:8000/images/' + file.name,
        info: ''
    };
    return ctx.body = new SuccessModel(body)

});


module.exports = router;
