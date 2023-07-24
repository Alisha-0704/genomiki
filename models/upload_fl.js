const { Sequelize, Datatypes } = require('sequelize');

const sequelize = require('../models/index')

const files_upload = sequelize.define('files_upload',{
    id:{ type: Sequelize.INTEGER, autoIncrement: true, allowNull: false, primaryKey: true},
    file_name:{ type: Sequelize.STRING, allowNull: false},
    file_link:{ type: Sequelize.STRING, allowNull: false},
    email:{ type: Sequelize.STRING, allowNull: false }

})

module.exports = files_upload;