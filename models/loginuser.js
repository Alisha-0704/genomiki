const { Sequelize, Datatypes } = require('sequelize');

const sequelize = require('../models/index')

const loginuser = sequelize.define('loginuser',{
    user_id:{ type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    user_name:{ type: Sequelize.STRING, allowNull: false},
    user_pass:{ type: Sequelize.STRING, allowNull: false}
})

module.exports = loginuser;