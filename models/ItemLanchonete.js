const {DataTypes} = require('sequelize')
const sequelize = require('../database/db')

const ItemLanchonete = sequelize.define('ItemLanchonete', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    }
});


module.exports = ItemLanchonete