"use strict";
module.exports = (sequelize, DataTypes) => {
  const cart = sequelize.define(
    "cart",
    {
      userId: DataTypes.NUMBER,
      bookId: DataTypes.NUMBER,
      quantity: DataTypes.NUMBER,
      status: DataTypes.NUMBER
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
    cart.belongsTo(models.book, {
      foreignKey: "bookId",
      as: "bookCart",
      sourceKey: "id"
    });
  };
  return cart;
};
