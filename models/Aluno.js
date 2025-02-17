const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const Aluno = sequelize.define('Aluno', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Nome não pode estar vazio' },
        len: {
          args: [2, 100],
          msg: 'Nome deve ter entre 2 e 100 caracteres'
        }
      }
    },
    saldo: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0,
      validate: {
        isDecimal: true,
        min: {
          args: [0],
          msg: 'Saldo não pode ser negativo'
        }
      }
    },
    responsavel: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Nome do responsável não pode estar vazio' },
        len: {
          args: [2, 100],
          msg: 'Nome do responsável deve ter entre 2 e 100 caracteres'
        }
      }
    }
  }, {
    tableName: 'Alunos',
    timestamps: true
  });
  
  module.exports = Aluno;
  