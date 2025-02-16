const sequelize = require('../database/db');


const Aluno = require('./Aluno');
const ItemLanchonete = require('./ItemLanchonete');
const Transacao = require('./Transacao');


Aluno.hasMany(Transacao, { foreignKey: 'id_aluno' });
Transacao.belongsTo(Aluno, { foreignKey: 'id_aluno' });

ItemLanchonete.hasMany(Transacao, { foreignKey: 'id_item_lanchonete' });
Transacao.belongsTo(ItemLanchonete, { foreignKey: 'id_item_lanchonete' });


sequelize.sync({ force: false })
    .then(() => {
        console.log('Tabelas sincronizadas');
    })
    .catch((error) => {
        console.error('Erro ao sincronizar tabelas:', error);
    });


module.exports = {
    Aluno,
    ItemLanchonete,
    Transacao
};