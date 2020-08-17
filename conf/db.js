const env = process.env.NODE_ENV;   // 环境参数

let MYSQL_CONF;
let REDIS_CONF;

if (env === 'dev') {
    // MYSQL_CONF = {
    //     host: 'localhost',
    //     user: 'root',
    //     password: '101207302das',
    //     port: '3308',
    //     database: 'myblog'
    // };

    MYSQL_CONF = {
        host: '106.52.xx.xx',
        user: 'myblog',
        password: '101207302das',
        port: '3306',
        database: 'myblog'
    };

    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

if (env === 'production') {
    // 三丰云

    // MYSQL_CONF = {
    //     host: '111.67.193.216',
    //     user: 'myblog',
    //     password: '101207302das',
    //     port: '3306',
    //     database: 'myblog'
    // };


    // 腾讯云
    MYSQL_CONF = {
             host: '106.52.xx.xx',
        user: 'myblog',
        password: '101207302das',
        port: '3306',
        database: 'myblog'
    };

    // MYSQL_CONF = {
    //     host: 'localhost',
    //     user: 'root',
    //     password: '101207302das',
    //     port: '3308',
    //     database: 'myblog'
    // };


    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
};
