const { DataTypes } = require('sequelize');
const { isLowercase } = require('validator');
const { sequelize } = require('../config/db');

const Auth = sequelize.define('Auth', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        isLowercase: true,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0,  // 0 = regular user, 1 = admin
    }
});


module.exports = Auth;