const Sequelize = require('sequelize');

const path = 'mysql://root:root123@localhost:3306/genomiki';

const sequelize = new Sequelize(path);

module.exports = sequelize;