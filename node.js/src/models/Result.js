const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const Result = sequelize.define('Result', {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: false,
    },
    resulttxt: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: false,
    },
    type: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    }
});

module.exports = Result;
