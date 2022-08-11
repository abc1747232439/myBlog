const { getErr } = require("../middleware/sendMessageMiddle");
const { pathToRegexp } = require("path-to-regexp");
const jwt = require('./jwt')

const needTokenApi = [
    { method: "POST", path: "/api/article/addArticle" },
    { method: "GET", path: "/api/user/whoami" },
    { method: "GET", path: "/api/user/getHomeInfo" },
    { method: "POST", path: "/api/user/updateUserInfo" },
    { method: "POST", path: "/ossUpload" },
    { method: "POST", path: "/upload" }
  ];

module.exports = async(ctx,next)=>{
    const apis = needTokenApi.filter(api=>{
        let reg = pathToRegexp(api.path)
        return ctx.method===api.method &&reg.test(ctx.path)
    })
    if(apis.length===0){
        await next()
        return; //此处必须return 洋葱模型会继续执行之后代码，不加意味着所有请求必须有token
    }

    const result = jwt.verify(ctx)//若验证成功此处返回解码后的token的payload
    //id为1的在本站意为站长，管理员 为了让其他用户也能访问whoami,homeinfo两个api，有以下
    const isPass = result && (result.id === 1 || ctx.path === '/api/user/whoami' || ctx.path === '/api/user/getHomeInfo'||ctx.path==="/api/user/updateUserInfo")
    //使用jwt中payload中的数据来实现用户鉴权
    if(isPass){
        ctx.request.userId = result.id
        await next()
    }
    else{
        ctx.status = 403
        ctx.body = getErr("‘未登录！",403)
    }
}