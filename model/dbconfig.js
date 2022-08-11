const {information} = require("../logger")
module.exports = {
    localDb:{
        database:"blog",  /* 本地 */
        username:"root",
        password:"12345",
        host:{
            host:"localhost",
            dialect:"mysql",
            timezone: '+08:00', //东八时区
            logging:information //SQL输入到log
        }
    },
    serverDb:{            /* 线上 */
        database:"",
        username:"",
        password:"",
        host:{
            host:"localhost",
            dialect:"mysql",
            timezone: '+08:00' ,
            logging:information
        }
    }
}