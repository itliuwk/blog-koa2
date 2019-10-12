const {
	exec
} = require('../db/mysql');


/**
 * 查找友链
 */
const getFriends = async (title) => {
	let sql = `select * from friends where 1=1 `;
	if (title) {
		sql += ` and name like '%${name}%' `
	}
	sql += ` order by createtime asc `;
	return await exec(sql);
};



/**
 * 添加友链
 */
const addFriends = async (friendsData) => {
	let {
		name,
		url,
		src,
		createtime = Date.now()
	} = friendsData;
	let sql = `insert into friends(name,url,src,createtime) values('${name}',"${url}","${src}",'${createtime}')`
	return await exec(sql);
};


/**
 * 更新友链
 */
const updateFriends = async (id, friendsData) => {
	let {
		name,
		url,
		src
	} = friendsData;
	let sql = `update friends set name='${name}',url='${url}',src='${src}' where id=${id} `

	const updateData = await exec(sql);

	if (updateData.affectedRows > 0) {
		return true;
	} else {
		return true;
	}
};


/**
 * 删除友链
 */
const delFriends = async (id) => {
	let sql = ` delete from friends where id='${id}' `
	return await exec(sql).then(delData => {
		if (delData.affectedRows > 0) {
			return true;
		} else {
			return true;
		}
	});
};





module.exports = {
	getFriends,
	addFriends,
	updateFriends,
	delFriends
};
