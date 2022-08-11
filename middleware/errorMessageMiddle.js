const { applicationLogger } = require('../logger') 
// 处理错误的中间件 koa应用本身的错误
module.exports = async (ctx, next) => {
  try {
    await next();
  } catch (e) {
    ctx.status = e.statusCode || e.status || 500
    ctx.body = e.message
    applicationLogger.error(`${ctx.statusCode}${ctx.status}${e.message}`)
  }
};