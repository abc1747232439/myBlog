const myWord = require("../model/tables/myword");
const User = require("../model/tables/user")
const {limitComment} = require("./utils")

exports.getMyCommentList = async function (page = 1, limit = 10) {
    const result = await myWord.findAndCountAll({
        offset: (page - 1) * limit,
        limit: +limit,
        order: [
            ['createdAt', 'DESC']
        ],
        include: [
            {
                model: User,
                attributes: ['userName', 'avatar', 'id'],
                required: false
            }
        ]
    })
    const { rows, count } = result
    let len = rows.length
    if (rows.length === 0 && !rows) return { total: 0, datas: [], len } // 如果没有文章
    rows.forEach(item => item.dataValues.index = page - 1)
    return {
        total: count,
        datas: rows,
        len
    }
}

exports.addComment = async (commentInfo,ctx)=>{
    const isAllow = limitComment(ctx,2,3) //3分钟不超过2条留言
    if(isAllow){
         const result = await myWord.create(commentInfo)
         return result.toJSON()
    }
    return;
}

exports.deleteWord = async (id)=>{
    const result = await myWord.findByPk(id)
    if(result){
        await result.destroy()
        return true
    }
    return false
}