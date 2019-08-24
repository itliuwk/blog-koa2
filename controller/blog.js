const {exec} = require('../db/mysql');


/**
 * 博客列表
 * @param author
 * @param keyword
 * @param classify
 * @param page
 * @param total
 * @returns {Promise<T | never>}
 */
const getList = async (author, keyword, classify, page, total) => {


    // let sql = `select * from blogs where 1=1 `;
    // if (author) {
    //     sql += `and author='${author}' `
    // }
    // if (keyword) {
    //     sql += `and title like '%${keyword}%' `
    // }
    // if (classify) {
    //     sql += `and title like '%${classify}%' `
    // }
    // sql += `order by createtime desc `;
    //
    // if (page) {
    //     sql += ` LIMIT ${page},${total};`
    // }


    let sql = ` select * from blogs a ,classify b where 1=1 `;

    if (author) {
        sql += `and a.author='${author}' `
    }
    if (keyword) {
        sql += `and a.title like '%${keyword}%' `
    }

    sql += `and a.classify =b.\`value\` order by a.createtime desc `;

    if (page) {
        sql += ` LIMIT ${page},${total};`
    }




    return await exec(sql);
};


/**
 * 博客列表总数
 * @param author
 * @param keyword
 * @returns {Promise<T | never>}
 */
const getListCount = async (author, keyword) => {


    let sql = `select count(id) from blogs where 1=1 `;
    if (author) {
        sql += `and author='${author}' `
    }
    if (keyword) {
        sql += `and title like '%${keyword}%' `
    }



    return await exec(sql).then(row => {
        return row[0];
    })
};


/**
 * 博客详情
 * @param id
 * @returns {Promise<any> | *}
 */
const getDetail = async (id) => {

    // let sql = ` select * from blogs where id = '${id}' `;
    let sql = ` select * from blogs a , classify b where a.id=${id} and b.value =a.classify;`;

    // 返回 promise

    return await exec(sql).then(row => {
        return row[0];
    })
};


/**
 * 新建博客
 * @param blogData
 * @returns {{id: number}}
 */
const newBlog = async (blogData) => {
    // blogData  是一个博客  对象  包含title content 属性
    const {title, subtitle, content, classify, author, createTime = Date.now()} = blogData;

    // let sql = ` insert into blogs (title,content,subtitle,createtime,author) values('${title}',"${content}",'${subtitle}',${createTime},'${author}');`;

    let sql = ` insert into blogs (title,content,subtitle,createtime,author,classify) values('${title}',"${content}",'${subtitle}',${createTime},'${author}','${classify}');`;




    return await exec(sql).then(insertData => {
        return {
            id: insertData.insertId
        }
    });
};


const updateBlog = async (id, blogData) => {
    const {title, subtitle, content} = blogData;

    let sql = ` update blogs set title='${title}', subtitle='${subtitle}', content='${content}' where id=${id}`;


    const updateData = await exec(sql);

    if (updateData.affectedRows > 0) {
        return true;
    } else {
        return true;
    }
};
const delBlog = async (id, author) => {
    let sql = ` delete from blogs where id='${id}' and author='${author}'`;

    return await exec(sql).then(delData => {
        if (delData.affectedRows > 0) {
            return true;
        } else {
            return true;
        }
    });
};

module.exports = {
    getList,
    getListCount,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
};
