const User = require('../model/tables/user')
const Article = require('../model/tables/article')
const ArticleWord = require('../model/tables/articleword')
const { limitComment } = require('./utils')
//文章评论
//本网站的分页方式全是真分页 不断向服务器获取对应页数的内容列表
exports.getCommentList = async(page=1,limit=10,articleId)=>{
        const result = await ArticleWord.findAndCountAll({
            offset: (page - 1) * limit,
            limit: +limit,
            order: [
                ['createdAt', 'DESC']
            ],
            where: {
                articleId
            },
            include: [
                {
                    model: User,
                    attributes: ['userName', 'avatar', 'id'],
                    required: false
                }
            ]
        })
    const {rows,count} = result
    let len = rows.length
    if(rows.length===0&&!rows) return {total:0,len,datas:[]}
    const datas = handleCommentList(rows)
    len = datas.length
    return {
        total:count,
        datas,
        len
    }
}
//在一条评论下回复，回复的评论会被自动赋予floorId，值为被回复评论的ID(值只能为最外层楼评论的ID)
function handleCommentList(datas){
    const listArr = datas.map((row)=>{
        row.dataValues.children = datas.filter((item)=> row.id===item.floorId)
        return row
    })//也就是说最外层楼评论的floorId为null
    //listArr中返回得到了所有评论，包括楼中楼
    return listArr.filter(item=>!item.floorId)//此处只返回最外层楼 floorId为null
}

exports.addComment = async(commentInfo,ctx)=>{
      const isAllow = limitComment(ctx,1,3)
      if(isAllow){
        const result = await ArticleWord.create(commentInfo)
        return result.toJSON()
      }
      return
}


