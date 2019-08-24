const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const session = require('koa-generic-session');
const redisStore = require('koa-redis');
// 下面以koa2-cors为例，
const cors = require('koa2-cors');



const blog = require('./routes/blog')
const user = require('./routes/user')
const claccify = require('./routes/claccify')

const {REDIS_CONF} = require('./conf/db');

// error handler
onerror(app)


app.use(cors({
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization', 'Date'],
    maxAge: 100,
    credentials: true,
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'anonymous'],
}));

// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})




//配置 session
// app.keys = ['liuwk'];
// app.use(session({
//     // 配置cookie
//     cookie: {
//         path: '/',
//         httpOnly: true,
//         maxAge: 24 * 60 * 60 * 1000
//     },
//
//     store: redisStore({
//         all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
//     })
// }));

// routes

app.use(blog.routes(), blog.allowedMethods())
app.use(user.routes(), user.allowedMethods())
app.use(claccify.routes(), claccify.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
