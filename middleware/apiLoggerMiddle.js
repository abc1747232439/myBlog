const { apiLogger } = require('../logger') 

// 处理错误的中间件
module.exports = async (ctx, next) => {
    try {
        await next();
    }
    finally {
        if (ctx.type === 'application/json') {
            apiLogger.debug(`${ctx.method} ${ctx.path} 响应体${JSON.stringify(ctx.body)} 请求体${JSON.stringify(ctx.request.body)}响应头部${JSON.stringify(ctx.response.header)}`)
        }
    }
};