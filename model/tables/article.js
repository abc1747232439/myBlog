const sequelize = require('./db')
const { DataTypes } = require("sequelize")
const moment = require("moment")
/* 文章表 */
const Article = sequelize.define('article', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      musicUrl: {
        type: DataTypes.STRING
      },
      musicName: {
        type: DataTypes.STRING
      },
      content: {
        type: DataTypes.TEXT('long'),
        allowNull: false
      },
      description: {
        type: DataTypes.STRING
      },
      visitsNum: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      likeNum: {
        type: DataTypes.INTEGER,
        defaultValue: 0
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
          return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
        }
      }
},{
    freezeTableName: true, // 固定表名字
})
 module.exports = Article