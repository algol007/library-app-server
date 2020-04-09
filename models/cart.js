"use strict";
module.exports = (sequelize, DataTypes) => {
  const cart = sequelize.define(
    "cart",
    {
      userId: DataTypes.NUMBER,
      bookId: DataTypes.NUMBER,
      quantity: DataTypes.NUMBER,
      status: DataTypes.BOOLEAN
    },
    {}
  );
  cart.associate = function(models) {
    // associations can be defined here
    cart.belongsTo(models.user, {
      foreignKey: "userId",
      as: "userCart",
      sourceKey: "id"
    });
    cart.hasMany(models.book, {
      foreignKey: "id",
      as: "bookCart",
      sourceKey: "id"
    });
  };
  return cart;
};
