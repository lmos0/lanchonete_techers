const {DataTypes} = require('sequelize')
const sequelize = require('../database/db')

const Aluno = require('./Aluno')
const ItemLanchonete = require('./ItemLanchonete')


const Transacao = sequelize.define('Transacao',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_aluno:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'Alunos',
            key: 'id'
        }
    },
    id_item_lanchonete:{
        type: DataTypes.INTEGER,
        allowNull: false,
        references:{
            model: 'ItemLanchonetes',
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



module.exports = Transacao