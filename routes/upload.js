const router = require('koa-router')();
const {
    SuccessModel,
    ErrorModel
} = require('../model/resModel')
router.prefix('/api/upload');


let fs = require('fs');
// 引入七牛模块
let qiniu = require("qiniu");
//要上传的空间名
let bucket = 'liuwk';
let imageUrl = 'http://images.sxitw.cn/'; // 域名名称
let accessKey = 'QfIZwOR9X5VkBlnSRr_s33i5D3Mw_ChpvuK6GHt6';
let secretKey = 'OB1UKzUsvWzHIOWhNvdLW7VNsAF2z3Hk6q3Xwt5I';
let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);

let options = {
    scope: bucket,
};
let putPolicy = new qiniu.rs.PutPolicy(options);
let uploadToken = putPolicy.uploadToken(mac);

let config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z2;
// 图片上传

router.post('/token', async function (ctx, next) {
    ctx.body = {uploadToken, domain: imageUrl};

});


module.exports = router;