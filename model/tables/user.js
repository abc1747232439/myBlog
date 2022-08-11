const sequelize = require('./db')
const { DataTypes } = require("sequelize")
const moment = require("moment")
/* 用户表 */
const User = sequelize.define('user', {
  userName: {
    type: DataTypes.STRING
  },
  account: {
    type: DataTypes.STRING
  },
  password: {
    type: DataTypes.STRING
  },
  aboutMe: {
    type: DataTypes.TEXT,
  },
  birthday: {
    type: DataTypes.DATE,
    get(){
      if (this.getDataValue('birthday')) { return moment(this.getDataValue('birthday')).format('YYYY-MM-DD HH:mm:ss') } else return ''
    }
  },
  avatar: {    // 头像
    type: DataTypes.STRING
  },
  motto: {   // 格言
    type: DataTypes.STRING
  },
  createdAt: {
    type: DataTypes.DATE,
    get(){
      return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
    }
  }
},
{
  freezeTableName: true, // 固定表名字
  paranoid: true, // 从此以后，该表的数据不会真正的删除，而是增加一列deleteAt，记录删除时间
  timestamps:true,
  updatedAt:false //不要updatedAt
})
module.exports = User