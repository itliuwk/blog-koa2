const {exec} = require('../db/mysql');


/**
 * 文章分类
 */
const getClassify = async () => {
    let sql = `select * from classify where 1=1 `;
    return await exec(sql);
};


/**
 * 文章分类
 */
const getClassifyLabel = async (value) => {
    let sql = `select * from classify where 1=1 `;
    if (value) {
        sql += ` and  value= ${value}`
    }
    return await exec(sql);
};


module.exports = {
    getClassify,
    getClassifyLabel
};
