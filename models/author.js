"use strict";
const { Model } = require("sequelize");
const { MODELS } = require("../utils/constants");
module.exports = (sequelize, DataTypes) => {
  class Author extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models[MODELS.USER], {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
    }
  }
  Author.init(
    {
      q1: DataTypes.STRING,
      q2: DataTypes.STRING,
      q3: DataTypes.STRING,
      status : DataTypes.STRING
    },
    {
      sequelize,
      modelName: MODELS.AUTHOR,
    }
  );
  return Author;
};
