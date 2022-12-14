const myWordSer = require("../../services/myCommetServ")
const {apiHandle} = require("../../middleware/sendMessageMiddle.js")
const Router = require("koa-router")

const myWord = new Router()

myWord.post("/addMyCom",async ctx=>{
    const data = ctx.request.body
    const result = await myWordSer.addComment(data,ctx)
    apiHandle(ctx,result,"不能刷屏哦，过几分钟在试试~")
})

myWord.post("/getMyComList",async ctx=>{
    const {pageSize = 10,pageNum=1} = ctx.request.body
    const result = await myWordSer.getMyCommentList(pageNum,pageSize)
    apiHandle(ctx,result,"获取留言列表失败, 刷新一下试试~~")
})

myWord.post("/deleteCom",async ctx=>{
    const {id} = ctx.request.body
    const result = await myWordSer.deleteWord(id)
    apiHandle(ctx,result,"删除失败，请重新试试~~'")
})

module.exports = myWord