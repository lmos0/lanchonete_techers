const {DataTypes} = require('sequelize')
const sequelize = require('../database/db')

const Aluno = require('./Aluno')
const ItemLanchonete = require('./ItemLanchonete')


const Transacao = sequelize.define('Transacaos',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_aluno:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: Aluno,
            key: 'id'
        }
    },
    id_item_lanchonete:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: ItemLanchonete,
            key: 'id'
        }
    },
    quantidade:{
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    },
    total:{
        type: DataTypes.FLOAT,
        allowNull: false,
    }
})

// Transacao.belongsTo(Aluno, {foreignKey: 'id_aluno'})
// Transacao.belongsTo(ItemLanchonete, {foreignKey: 'id_item_lanchonete'})

module.exports = Transacao