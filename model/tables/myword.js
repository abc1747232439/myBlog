const sequelize = require('./db')
const { DataTypes } = require("sequelize")
const moment = require("moment")
/* 留言表 */
const MyWord = sequelize.define('myword', {
    userId: { // 留言用户ID
        type: DataTypes.INTEGER,
        allowNull: false
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false
      },
      createdAt: {
        type: DataTypes.DATE,
        get(){
          return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss')
        }
      },
      updatedAt: {
        type: DataTypes.DATE,
        get(){
          return moment(this.getDataValue('updateAt')).format('YYYY-MM-DD HH:mm:ss')
        }
      }
},{
    freezeTableName: true ,// 固定表名字
    timestamps: true, // 增加createdAt和updatedAt字段
})

module.exports = MyWord;