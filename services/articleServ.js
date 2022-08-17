const Article = require("../model/tables/article")
const ArticleWord = require('../model/tables/articleword')
const User = require('../model/tables/user')

//添加
exports.addArticle = async (data)=>{
    const result = await Article.create(data)
    return result.toJSON()
}
//删除
exports.deleteArt = async (id)=>{
    const result = await Article.findByPk(id)
    if(result){
        await result.destroy()
        return true
    }else{
        return false
    }
}
//查询
exports.getArtList = async(page=1,limit=10,isHome=false)=>{
        const result = await Article.findAndCountAll({
          offset: ( page - 1 ) * limit,
          limit: limit,
          order: [
            ['createdAt', 'DESC']
          ],
          attributes: {
            exclude: ['content']
          },
          include: [
            {
              model: ArticleWord
            }
          ]
        })
    let {rows,count} = result
    let len = rows.length
    if(rows.length === 0&&!rows){
        return {total:0,datas:[],len}
    }
    rows.forEach(item=>item.dataValues.index = page - 1) //此处添加的index指的是在第几页 0开始计数
    if(!isHome){rows = listGroup(rows)}
    count = await Article.count()
    return {
        total:count,
        datas:rows,
        len
    }
}
// 把文章数据进行时间分组 
//同一年同一个月的几个记录包到一个数组里 每个记录加年月日字段
function listGroup (rows) {
    const yearMap = new Map()
    const yearArr = [] // 记录文章出现的年份
    const monthArr = ['12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
    const yearGroupArr = [] // 把文章按照年份分组
    rows.forEach(item => {
      const year = item.createdAt.split("-")[0]
      !yearMap.has(year) ? yearMap.set(year, year) : '' // 如果年份没出现过，记录起来
    })
    yearMap.forEach(item => yearArr.push(item)) // 把年份处理成数组
  
    yearArr.forEach(year => { // 把文章按年份分组 然后在按月份分组....其实就是按年份和月份降序排序
      const resultArr = rows.filter(item => {
        const [ rowYear, rowMonth, surplus ] = item.createdAt.split("-")
        let rowDay = surplus.split(" ")[0]
        rowDay[0] === '0' ? rowDay = rowDay.substr(1, 1) : ''
        if (rowYear === year) { 
          item.dataValues.year = year
        }
        item.dataValues.month = rowMonth
        item.dataValues.day = rowDay
        return rowYear === year
      })
      if (resultArr.length === 0) return
      monthArr.forEach(m => {
        const resultMonth = resultArr.filter(d => d.dataValues.month === m)
        resultMonth.length !== 0 && yearGroupArr.push(resultMonth)
      })
    })
  
    return yearGroupArr
  }
exports.getArtDetail = async(id,userId,ctx)=>{
    let result = await Article.findOne({
        where:{
            id
        },
        include: [{
            attributes: ['id'],
            model: User,
            //right:true,//right join
            required: false,  //此处若为true表示从默认的left join转为inner join
            through: {
              attributes: []    //因为article与articleWord是多对多关系，此处through中attributes为空数组，表示不需要联结表中的数据
            },    //默认情况返回多对多关系中连接表中所有数据
            where: {
              id: userId //转为连接SQL中的on语句
            }
          }]
    })
    if(!result) return result
    result.increment("visitsNum",{by:1})  //让该字段递增，若为1可忽略by
    result = result.toJSON()
    handleData(result)
    return result
}
//每个记录添加content文本长度字段以及是否喜欢该文章字段
function handleData(result){
    result.users.length === 0? result.isLike = false:result.isLike=true
    const len = result.content.replace(/<\/?.+?>/g, "").replace(/(\r\n|\n|\r)/gm, "").length
    result.testLen = len
    delete result.users
}
exports.likeArt = async ({articleId,userId})=>{
    try{
        const artIns = await Article.findByPk(articleId)
        const userIns = await User.findByPk(userId)
        await artIns.addUser(userIns) //在联结表like中添加记录
       await  artIns.increment("likeNum")
       return true
    }catch(e){
        return false
    }
}