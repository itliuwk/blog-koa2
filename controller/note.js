const {
	exec
} = require('../db/mysql');


/**
 * 查找笔记
 */
const getNote = async (title) => {
	let sql = `select * from note where 1=1 `;
	if (title) {
		sql += ` and title like '%${title}%' `
	}
	sql += ` order by createtime desc `;
	return await exec(sql);
};



/**
 * 添加笔记
 */
const addNote = async (noteData) => {
	console.log(noteData)
	let {
		title,
		content,
		createtime = Date.now()
	} = noteData;
	let sql = `insert into note(title,content,createtime) values('${title}',"${content}",'${createtime}')`
	return await exec(sql);
};


/**
 * 更新笔记
 */
const updateNote = async (id, noteData) => {
	let {
		title,
		content
	} = noteData;
	let sql = `update note set title='${title}',content='${content}' where id=${id} `

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
const delNote = async (id) => {
	let sql = ` delete from note where id='${id}' `
	return await exec(sql).then(delData => {
		if (delData.affectedRows > 0) {
			return true;
		} else {
			return true;
		}
	});
};





module.exports = {
	getNote,
	addNote,
	updateNote,
	delNote
};
