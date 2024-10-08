"use strict";
const { Model } = require("sequelize");
const { MODELS } = require("../utils/constants");
module.exports = (sequelize, DataTypes) => {
  class Impression extends Model {
    static associate(models) {
      // // define association here
      this.belongsTo(models[MODELS.POST]);
      this.belongsTo(models[MODELS.USER]);

    }
  }
  Impression.init(
    {},
    {
      sequelize,
      modelName: MODELS.IMPRESSION,
    }
  );
  return Impression;
};
