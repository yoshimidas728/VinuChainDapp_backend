'use strict';
const {
  Model
} = require('sequelize');
const {MODELS} = require('../utils/constants')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models[MODELS.POST],{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      this.hasMany(models[MODELS.LIKE],{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      this.hasMany(models[MODELS.COMMENT],{
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      })
      this.hasOne(models[MODELS.AUTHOR],{
        onDelete:"CASCASE",
        onUpdate : "CASCADE"
      })
      this.hasMany(models[MODELS.IMPRESSION])
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    displayName: DataTypes.STRING,
    about: DataTypes.STRING,
    avatar : DataTypes.STRING,
    walletAddress: DataTypes.STRING,
    role : DataTypes.STRING,
    fToken : DataTypes.STRING,
    expiresIn : DataTypes.DATE
  }, {
    sequelize,
    modelName: MODELS.USER,
  });
  return User;
};