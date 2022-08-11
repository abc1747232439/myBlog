const {apiHandle} = require("../../middleware/sendMessageMiddle");
const artiSer = require("../../services/articleServ")
const Router = require("koa-router")

const article = new Router()

article.post("/getArtList",async ctx=>{
    const {pageSize=10,pageNum=1,isHome=false} =ctx.request.body
    const result = await artiSer.getArtList(pageNum,pageSize,isHome)
    apiHandle(ctx,result,'获取文章列表失败, 刷新一下试试~~') 
})

article.get("/getArtDetail",async ctx=>{
    const {id,userId} = ctx.query
    const result = await artiSer.getArtDetail(id,userId,ctx)
    apiHandle(ctx,result,"获取文章详情, 刷新一下试试~~")
})

article.post("/addArticle",async ctx=>{
    try{
        const bodydata = ctx.request.body
        bodydata.userId = ctx.request.userId
        const result = await artiSer.addArticle(bodydata)
        apiHandle(ctx,result,"增加文章失败, 刷新一下试试~~")
    }catch(e){
        console.log(e);
    }
})

article.post("/likeArt",async ctx =>{
    const data = ctx.request.body
    const result = await artiSer.likeArt(data)
    apiHandle(ctx,result,'喜欢文章失败')
})
module.exports = article
