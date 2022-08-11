const User = require('../model/tables/user');
const Article = require("../model/tables/article")
const myWord = require("../model/tables/myword")
const moment = require("moment")
const { getRandom } = require('./utils')

/* 注册 */
exports.addUser = async (data)=>{
   const [result,created] = await User.findOrCreate({  //如果根据where找不到，就创建一个条目，使用defaults\where中的属性，以default为主
        where:{    //此处返回的created是布尔值 若为true则找不到条件，重新create了一条记录
            account:data.account   //data中包含账号  密码
        },
        attributes:{
            exclude:["password"],  //返回值排除password这一列
        },
        defaults:{...data}     //如果找到了，就不用管
   })
   if(!created) return;
   const avatarSrc = `https://efiles.oss-cn-shenzhen.aliyuncs.com/file/avatar${getRandom(1, 9)}.jpg`
      result.avatar = avatarSrc
      result.save()
   return result.toJSON()
}
//此处的逻辑是 前端注册后信息都会保存在localstroage，再次注册并不会注册成新用户，而是修改原来的用户信息，想注册新用户需要换个浏览器，或清除localstroage
exports.registry = async(data)=>{
    const result = await User.findByPk(data.id);  //findByPk的返回的要么是null，要么是object
    if(!result) return;
    const res = await User.findAll({  //返回空数组或带有记录的数组
        where:{
            account:data.account
        }
    })
    if (res.length!==0) return  // 账号已存在
    for(let key in data){
        if(data[key]){
           result[key] = data[key]  //此处修改信息
        }
    }
    await result.save()  //同步数据库
    delete result.password
    delete result.daleteAt
    return result;
}
//登录
exports.login = async(account,password)=>{
    const result = await User.findOne({ //返回null或
        where:{
            account,
            password
        },
        attributes:{
            exclude:["deletedAt"]
        }
     })
    
     if(result&& result.account===account&&result.password===password){
        const val = result.toJSON()
        delete val.password
        return val
    }
    return null
}
//查询用户及相关信息
exports.getHomeInfo = async()=>{
    const result = await Article.findAndCountAll({
        attributes:['createdAt'],
        order:[
            ['createdAt',"DESC"]
        ]
    })  //此处返回一个包含对象，包含一个count属性，一个数组包含符合条件的row
    const {count,rows} = result
    const wordCount = await myWord.count()
    if(rows.length===0){
        return {
           articleCount:0,
           articleDiff:0,
           wordCount
        }
    }
    const x = new moment()
    const y = new moment(rows[0].createdAt)
    const articleDiff = x.diff(y,'d')

    return {
        articleCount:count,
        articleDiff,
        wordCount
    }
}
exports.getAboutMe = async (id)=>{
   const result = await User.findOne({
        where:{id},
        attributes:['aboutMe']
   })
   return result.toJSON()
}
exports.getSelf = async(id)=>{
    const result = await User.findByPk(id)
    if(!result) return
    let val = result.toJSON()
    delete val.password
    delete val.deletedAt
    return val
}
//更新用户信息   后台界面中的设置
exports.updateInfo = async(data)=>{
    const result = await User.findByPk(data.id)
    if(!result) return
    for(let key in data){
       result[key] =  data[key]
    }
   await result.save()
   let  val = result.toJSON()
    delete val.password
    delete val.deletedAt
    return val
}