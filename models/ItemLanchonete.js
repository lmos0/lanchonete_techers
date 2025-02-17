const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const ItemLanchonete = sequelize.define('ItemLanchonete', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'Nome do item não pode estar vazio' },
      len: {
        args: [2, 100],
        msg: 'Nome do item deve ter entre 2 e 100 caracteres'
      }
    }
  },
  preco: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: {
      isDecimal: true,
      min: {
        args: [0],
        msg: 'Preço não pode ser negativo'
      }
    }
  },
  ativo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'ItemLanchonetes',
  timestamps: true
});

module.exports = ItemLanchonete;
