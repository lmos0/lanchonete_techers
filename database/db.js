const Sequelize = require('sequelize')

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: 'database/database.sqlite'
})

// const Aluno = require('../models/Aluno')
// const ItemLanchonete = require('../models/ItemLanchonete')
// const Transacao = require('../models/Transacao')



// Transacao.belongsTo(Aluno, {foreignKey: 'id_aluno'})
// Transacao.belongsTo(ItemLanchonete, {foreignKey: 'id_item_lanchonete'})

module.exports = sequelize