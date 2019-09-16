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


/**
 * 文章分类出现次数
 */
const getClassifyLen = async (value) => {
    let sql = `SELECT a.label,a.value,sum(case when b.classify is not null then 1 else 0 end) as length from classify a left JOIN blogs b on a.value=b.classify GROUP BY a.value;
`;
    return await exec(sql);
};


module.exports = {
    getClassify,
    getClassifyLabel,
	getClassifyLen
};
