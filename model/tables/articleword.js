const sequelize = require('./db');
const { DataTypes } = require("sequelize");
const moment = require("moment");
/* 文章留言表 */
const ArticleWord = sequelize.define('articleword', {
    floorId: {   //楼层
        type: DataTypes.INTEGER
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
          return moment(this.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss')
        }
      }
},{
    freezeTableName: true, // 固定表名字
})
module.exports = ArticleWord