const {DataTypes, Sequelize} = require('sequelize')
const sequelize = require('../database/db')

const Transacao = require('./Transacao')

const Aluno = sequelize.define('Aluno',{
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        validate:{
            notEmpty: true,
            len:[2,100]
        }
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    saldo:{
        type: DataTypes.FLOAT,
        allowNull: false,
        defaultValue: 0

    },
    responsavel:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

module.exports = Aluno