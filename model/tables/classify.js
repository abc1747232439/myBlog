const sequelize = require('./db')
const { DataTypes } = require("sequelize")
const moment = require("moment")
/* 分类表 */
const Classify = sequelize.define('classify', {
    name: { // 留言用户ID
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        get(){
          return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
        }
      }
},{
    freezeTableName: true, // 固定表名字
})
module.exports = Classify