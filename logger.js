const log4js = require('koa-log4')
const path = require('path')

log4js.configure({
    appenders: {
        api: {
            type: 'dateFile',
            filename: path.resolve(__dirname, 'logs', 'api', 'logging.log'),
            maxLogSize: 1024 * 1024, // 配置文件的最大字节数
            keepFileExt: 3, // 最多保存3天
            layout: {      //此处配置log文件的日志内容的格式
                type: 'pattern',  
                pattern: '%c [%d{yyyy-MM-dd hh:mm:ss}] [%p]：%m%n'
            }
        },
        application: {
            type: 'dateFile',
            filename: path.resolve(__dirname, 'logs', 'application', 'logging.log'),
            maxLogSize: 1024 * 1024, // 配置文件的最大字节数
            keepFileExt: 3, // 最多保存3天
            layout: {      //此处配置log文件的日志内容的格式
                type: 'pattern',  
                pattern: '%c [%d{yyyy-MM-dd hh:mm:ss}] [%p]：%m%n'
            }
        },
        default: {
            type: 'stdout',
            maxLogSize: 1024 * 1024, // 配置文件的最大字节数
            keepFileExt: 3, // 最多保存3天
        }
    },
    categories: {
        api: {
            appenders: ['api'],
            level: 'all'
        },
        application: {
            appenders: ['application'],
            level: 'error'
        },
        default: {
            appenders: ['default'],
            level: 'all'
        }
    }
})

process.on("exit", () => {
    log4js.shutdown()
})
const apiLogger = log4js.getLogger("api")
const applicationLogger = log4js.getLogger("application")
function information(msg){
    applicationLogger.info(msg)
}

exports.apiLogger = apiLogger
exports.applicationLogger = applicationLogger
exports.information = information