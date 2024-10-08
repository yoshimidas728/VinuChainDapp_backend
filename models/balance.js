"use strict";
const { Model } = require("sequelize");
const { MODELS } = require("../utils/constants");
module.exports = (sequelize, DataTypes) => {
  class Balance extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Balance.init(
    {
      balance: { type: DataTypes.STRING, defaultValue: "0" },
    },
    {
      sequelize,
      modelName: MODELS.BALANCE,
    }
  );
  return Balance;
};
