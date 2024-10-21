const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('mssql::memory:');

const Product = sequelize.define(
  'Product',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Description: {
      type: DataTypes.STRING
    },
    Price: {
        type: DataTypes.DOUBLE
    }
  },
  {
    tableName: 'Products', 
    timestamps: false 
  }
);
module.exports = Product;

