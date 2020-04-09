"use strict";
module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define(
    "book",
    {
      title: DataTypes.STRING,
      image: DataTypes.STRING,
      author: DataTypes.STRING,
      isbn: DataTypes.STRING,
      isAvailable: DataTypes.BOOLEAN,
      totalPage: DataTypes.INTEGER,
      categoryId: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      language: DataTypes.STRING,
      publishedBy: DataTypes.STRING,
      publishedAt: DataTypes.INTEGER
    },
    {}
  );
  book.associate = function(models) {
    // associations can be defined here
    book.belongsTo(models.category, {
      foreignKey: "categoryId",
      as: "bookCategory",
      sourceKey: "id"
    });
    book.hasMany(models.cart, {
      foreignKey: "id",
      as: "bookCart",
      sourceKey: "id"
    });
  };
  return book;
};
