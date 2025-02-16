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
    },
    
}, {
    tableName: 'ItemLanchonetes' // Nome da tabela no banco de dados
});


module.exports = ItemLanchonete