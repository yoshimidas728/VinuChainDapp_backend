'use strict';
const {
  Model
} = require('sequelize');
const {MODELS} = require('../utils/constants')
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {

    static associate(models) {
      // define association here
      this.belongsTo(models[MODELS.USER])
    }
  }
  Comment.init({
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: MODELS.COMMENT,
  });
  return Comment;
};