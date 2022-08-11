const {Sequelize} = require("sequelize");
const {localDb:{database,username,password,host}} = require("../dbconfig");
const sequelize = new Sequelize(database, username, password, host)
module.exports = sequelize;