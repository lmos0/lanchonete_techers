const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database/database.sqlite'
})


// const ItemLanchonete = require('.ItemLanchonete./models/ItemLanchonete')
// const Aluno = require('..Aluno/models/Aluno')
// const Transacao = require('..Transacao/models/Transacao')
// const User = require('..User/models/User')

module.exports = sequelize