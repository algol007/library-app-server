"use strict";
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
      role: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN
    },
    {}
  );
  user.associate = function(models) {
    // associations can be defined here
    user.belongsTo(models.cart, {
      foreignKey: "id",
      as: "userCart",
      sourceKey: "id"
    });
  };
  return user;
};
