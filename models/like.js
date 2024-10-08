'use strict';
const {
  Model
} = require('sequelize');
const {MODELS} = require('../utils/constants')
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {

    static associate(models) {
      // define association here
      this.belongsTo(models[MODELS.POST],{
        onDelete :"CASCADE",
        onUpdate : "CASCADE"
      })
      this.belongsTo(models[MODELS.USER],{
        onDelete :"CASCADE",
        onUpdate : "CASCADE"
      })
    }
  }
  Like.init({
    
  }, {
    sequelize,
    modelName: MODELS.LIKE,
  });
  return Like;
};