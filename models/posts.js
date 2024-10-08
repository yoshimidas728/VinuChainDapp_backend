"use strict";
const { Model } = require("sequelize");
const { MODELS } = require("../utils/constants");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      // define association here
      this.hasMany(models[MODELS.COMMENT], {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(models[MODELS.LIKE], {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.belongsTo(models[MODELS.USER], {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      });
      this.hasMany(models[MODELS.IMPRESSION])
    }

  }
  Post.init(
    {
      title: DataTypes.STRING,
      tags: {
        type: DataTypes.ARRAY(DataTypes.TEXT),
        defaultValue: [],
      },
      description: DataTypes.JSON,
      status: DataTypes.STRING,
      time : DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: MODELS.POST,
    }
  );
  return Post;
};
