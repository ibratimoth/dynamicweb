const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Carousel = sequelize.define('Carousel', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    slogan: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'carousel',
    timestamps: true,
});

module.exports = Carousel;
