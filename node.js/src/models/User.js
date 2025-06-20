// src/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/sequelize');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  hashed_password: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
  }
});

module.exports = User;
