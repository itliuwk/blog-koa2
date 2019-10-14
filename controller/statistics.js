const {
	exec
} = require('../db/mysql');


/**
 * 查找统计
 */
const getStatistics = async () => {
	let sql = `select * from statistics where 1=1 `;
	return await exec(sql);
};


/**
 * 更新网站总访问统计
 */
const updateStatistics = async () => {

	let logintime = Date.now();
	const registerCount = await exec(`SELECT COUNT(*) as count FROM users`);
	let allCountSql = ` UPDATE statistics SET count=(count+1),logintime=${logintime} WHERE id= '1' `
	let registerCountSql = ` UPDATE statistics SET count=${registerCount[0].count},logintime=${logintime} WHERE id= '2' `
	const updateData = await exec(allCountSql);
	await exec(registerCountSql)



	if (updateData.affectedRows > 0) {
		return true;
	} else {
		return true;
	}
};








module.exports = {
	getStatistics,
	updateStatistics
};
