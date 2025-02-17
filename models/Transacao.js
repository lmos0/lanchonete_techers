const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Transacao = sequelize.define('Transacao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_aluno: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Alunos',
      key: 'id'
    }
  },
  id_item_lanchonete: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'ItemLanchonetes',
      key: 'id'
    }
  },
  quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    validate: {
      min: {
        args: [1],
        msg: 'Quantidade deve ser maior que zero'
      }
    }
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: {
        args: [0],
        msg: 'Total não pode ser negativo'
      }
    }
  }
}, {
  tableName: 'Transacoes',
  timestamps: true
});

module.exports = Transacao;
