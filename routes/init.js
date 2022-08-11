const Koa = require("koa")
const bodyparser = require("koa-bodyparser");
const router = require("./api/sync")
const http = require('http')
const path = require("path")
const staticMid = require('koa-static') // 静态资源中间件
const staticPath = path.resolve(__dirname, '../public')
const cors = require("@koa/cors")
const {KoaSession,sessionConfig,sessionKey} = require("./sessionConfig")

const app = new Koa()

app.use(bodyparser())
/* app.use(require("../middleware/errorMessageMiddle")) */
app.use(require("../middleware/apiLoggerMiddle"))
app.use(cors({
    credentials: true,
    maxAge:3600 * 24
}))
app.keys = sessionKey  //设置Cookie签名密钥
app.use(KoaSession(sessionConfig,app)) //此处在ctx上挂载了ctx.session

app.use(require("./token"));
app.use(staticMid(staticPath)) // 引入静态资源中间件
app.use(router.routes()).use(router.allowedMethods())

http.createServer(app.callback()).listen(5008, () => {
  console.log('5008, http链接成功 ');
}) 