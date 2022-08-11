const Router = require("koa-router");
const user = require("./user")
const article = require('./article')
const articleWord = require('./articleWord')
const { code } = require('../../middleware/captachaMiddleware')
const myWord = require('./myWord')
const upload = require('./upload')

const router = new Router();

const routerArr = [
    { key: '/api/user', router: user },
    { key: '/api/article', router: article }, 
    { key: '/api/articleWord', router: articleWord},
    { key: '/api/myWord', router: myWord},
    { key: '', router: code },
    { key: '', router: upload },
  ]
  
routerArr.forEach(r => {router.use(r.key, r.router.routes(), r.router.allowedMethods())})

module.exports = router