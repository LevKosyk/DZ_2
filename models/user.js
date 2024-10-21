const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mssql::memory:');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  }
  ,
  {
    tableName: 'Users',
    timestamps: false
  }

);
module.exports = User;

