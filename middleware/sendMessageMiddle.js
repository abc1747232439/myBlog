/* 处理api 发送消息或错误处理 */

 //包装返回json数据 
 exports.getErr = function(err="服务器错误",code=500){
    return {
       code,
       msg:err
    }
}
exports.getResult = function(data){
     return {
        code:200,
        msg:"success",
        data
    }
}
/**
 * 
 * @param {*} ctx koa返回的对象
 * @param {*} result 返回的结果
 * @param {*} err 错误消息
 * @param {*} cb 回调
 */
//得到包装后的数据，ctx.body
exports.apiHandle = function(ctx,result,err,cb){
     if(!result){
       ctx.body = exports.getErr(err,401)
    }else{
       ctx.body = exports.getResult(result)
       cb&&cb(result)
    }
}