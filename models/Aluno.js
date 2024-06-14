const {Datatypes, Sequelize} = require('sequelize')
const sequelize = require('../database/db')

const Transacao = require('./Transacao')

const Aluno = sequelize.define('Aluno',{
    id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: Sequelize.STRING,
        allowNull: false
    },
    saldo:{
        type: Sequelize.FLOAT,
        allowNull: false,
        defaultValue: 0

    }
})

Aluno.hasMany(Transacao, {foreignKey: 'id_aluno'})
Transacao.belongsTo(Aluno, {foreignKey: 'id_aluno'})

module.exports = Aluno