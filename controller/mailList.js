const {
	exec
} = require('../db/mysql');


/**
 * 查找通讯录
 */
const getMailList = async (call) => {
	let sql = `select * from mailList where 1=1 `;
	if (call) {
		sql += ` and whisper like '%${call}%' `
	}
	sql += ` order by createtime asc `;
	return await exec(sql);
};



/**
 * 添加通讯录
 */
const addMailList = async (mailListData) => {
	let {
		mobile,
		call,
		describe,
		createtime = Date.now()
	} = mailListData;
	let sql = "insert into mailList(mobile,`call`,`describe`,createtime) values('"+mobile+"','"+call+"','"+describe+"','"+createtime+"')"
	return await exec(sql);
};


/**
 * 更新通讯录
 */
const updateMailList = async (id, mailListData) => {
	let {
		mobile,
		call
	} = mailListData;
	let sql = `update mailList set mobile='${mobile}' call='${call}' where id=${id} `

	const updateData = await exec(sql);

	if (updateData.affectedRows > 0) {
		return true;
	} else {
		return true;
	}
};


/**
 * 删除通讯录
 */
const delMailList = async (id) => {
	let sql = ` delete from mailList where id='${id}' `
	return await exec(sql).then(delData => {
		if (delData.affectedRows > 0) {
			return true;
		} else {
			return true;
		}
	});
};





module.exports = {
	getMailList,
	addMailList,
	updateMailList,
	delMailList
};
