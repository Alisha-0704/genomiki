const { Sequelize, Datatypes } = require('sequelize');
const sequelize = require('../models/index')

const Session = sequelize.define('session',{
    session_id:{ type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    user_id:{ type: Sequelize.STRING, allowNull: false},
    jwt:{ type: Sequelize.STRING, allowNull: false},
    status:{ type: Sequelize.STRING, allowNull: false},
    createdAt:Sequelize.DATE,
    updatedAt: Sequelize.DATE,
})

module.exports = Session;