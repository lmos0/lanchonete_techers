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
        allowNull: false,
        validate:{
            notEmpty: true,
            len:[2,100]
        }
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate:{
            min:0
        }
    },
    
}, {
    tableName: 'ItemLanchonetes' 
});


module.exports = ItemLanchonete