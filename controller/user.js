const {exec, escape} = require('../db/mysql');

const login = async (username, password) => {

    //防SQL 注入
    username = escape(username);
    password = escape(password);
    const sql = ` select username , realname , id , createDate from users where username=${username} and password=${password}; `;

    const rows = await exec(sql);
    return rows[0] || {}
};

const Register = async (username, password, realname) => {
    //防SQL 注入
    username = escape(username);
    password = escape(password);
    realname = escape(realname);
    let dUsername = username.replace(/\'/g, "");

    const userSql = ` select * from users where username like '%${dUsername}%'`;


    const user = await exec(userSql);

    if (user.length === 0) {
        const sql = ` insert into users(username,password,realname) values(${username},${password},${realname}); `;
        const insert = await exec(sql);

        if (insert.affectedRows > 0) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }


};
module.exports = {
    login,
    Register
};
