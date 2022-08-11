const userServ = require("../../services/userSer")
const Router = require("koa-router")
const {apiHandle}  = require("../../middleware/sendMessageMiddle.js")
const jwt = require("../jwt");

const user = new Router();

//添加用户
user.post("/addUser",async(ctx)=>{
     const result = await userServ.addUser(ctx.request.body)
     apiHandle(ctx,result,"该账号已被使用,请换个账号")
})
user.post("/registry",async ctx=>{
    const bodyData = ctx.request.body 
    if (bodyData.captcha !== ctx.session.captcha) {
        apiHandle(ctx, '', '验证码错误')
        return
    }
    const result = await userServ.registry(ctx.request.body)
    apiHandle(ctx,result,"该账号已被使用,请换个账号")
})
//登录
user.post("/login",async ctx=>{
     const result = await userServ.login(ctx.request.body.account,ctx.request.body.password)
     /* apiHandle(ctx, result, '账号不存在, 请先注册账号', ( {id} ) => {
    jwt.publish(ctx, undefined, { id })
  }) */
  apiHandle(ctx,undefined,"账号或密码错误,请重新输入")
  if(result){
    const {id} = result
    jwt.publish(ctx, undefined, { id })
  }
})
//查看用户信息
user.get("/getHomeInfo",async(ctx)=>{       
    const result = await userServ.getHomeInfo()
    apiHandle(ctx,result,'还没发文章呢，快去发一篇吧')  //此处逻辑有问题，上边的result不可能返回空或其他值，所以若向apihandle传入的err信息并没有用
})
user.get("/getAboutMe",async(ctx)=>{
    const result = await userServ.getAboutMe(1)
    apiHandle(ctx,result,"获取个人信息失败...请重试呜呜")
})
user.get("/whoami",async ctx=>{
    const result = await userServ.getSelf(ctx.request.userId) //此处的id是登陆后jwt颁发的id对应着user表中的id，token中间件将其挂载到了ctx.request上
    apiHandle(ctx,result,"")
})
//更新
user.post("/updateUserInfo",async(ctx)=>{
    const result = await userServ.updateInfo(ctx.request.body)
    apiHandle(ctx,result,"修改失败")
})
module.exports = user

