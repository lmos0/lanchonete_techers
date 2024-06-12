const {DataTypes} = require('sequelize')
const sequelize = require('../database/db')

const User = sequelize.define('User',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    senha:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = User
