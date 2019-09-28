const {
	exec
} = require('../db/mysql');


/**
 * 查找微语
 */
const getWhisper = async (whisper) => {
	let sql = `select * from whisper where 1=1 `;
	if (whisper) {
		sql += ` and whisper like '%${whisper}%' `
	}
	sql += ` order by createtime asc `;
	return await exec(sql);
};



/**
 * 添加微语
 */
const addWhisper = async (whisperData) => {
	let {
		whisper,
		author,
		createtime = Date.now()
	} = whisperData;
	let sql = `insert into whisper(whisper,author,createtime) values('${whisper}','${author}','${createtime}')`
	return await exec(sql);
};


/**
 * 更新微语
 */
const updateWhisper = async (id, whisperData) => {
	let {
		whisper
	} = whisperData;
	let sql = `update whisper set whisper='${whisper}' where id=${id} `

	const updateData = await exec(sql);

	if (updateData.affectedRows > 0) {
		return true;
	} else {
		return true;
	}
};


/**
 * 删除笔记
 */
const delWhisper = async (id) => {
	let sql = ` delete from whisper where id='${id}' `
	return await exec(sql).then(delData => {
		if (delData.affectedRows > 0) {
			return true;
		} else {
			return true;
		}
	});
};





module.exports = {
	getWhisper,
	addWhisper,
	updateWhisper,
	delWhisper
};
