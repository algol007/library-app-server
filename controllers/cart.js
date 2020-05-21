const Carts = require("../models").cart;
const Books = require("../models").book;
const Users = require("../models").user;
const { handleError, ErrorHandler } = require("../helper/error");

exports.createCart = (req, res, next) => {
  const { userId, bookId, quantity, status } = req.body

  Carts.create({
    userId, bookId, quantity, status
  })
    .then(data => {
      res.status(201).send({
        message: "Book has been added to cart!",
        cart: data
      });
    })
};

exports.readAllCart = (req, res, next) => {
  Carts.findAndCountAll({
    order: [["createdAt", 'DESC']],
    include: [
      { model: Users, as: "userCart", attributes: ["name"] },
      { model: Books, as: "bookCart", attributes: ["id", "title", "image"] }
    ],
  })
    .then(data => {
      res.status(200).json({
        carts: data
      });
    })
};

exports.readCartById = (req, res, next) => {
  const userId = req.params.userId;

  Carts.findAndCountAll({
    order: [["createdAt", 'DESC']],
    include: [
      { model: Users, as: "userCart", attributes: ["name"] },
      { model: Books, as: "bookCart", attributes: ["id", "title", "image"] }
    ],
    where: { userId: userId },
  })
    .then(data => {
      res.status(200).json({
        carts: data
      });
    })
};


exports.updateCart = async (req, res, next) => {
  const cartId = req.params.cartId;
  const { userId, bookId, quantity, status } = req.body

  try {
    const cart = await Carts.findOne({
      where: { id: cartId }
    });
    if (!cart) {
      throw new ErrorHandler(404, "Cart not found!");
    } else {
      Carts.update({ status: req.body.status },
        { where: { id: cartId } } )
        .then(data => {
        res.status(200).json({
          message: "Cart has been updated!",
          data: data
        });
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteCart = async (req, res, next) => {
  const cartId = req.params.cartId;

  try {
    const cart = await Carts.findOne({
      where: { id: cartId }
    });
    if (!cart) {
      throw new ErrorHandler(404, "Cart not found!");
    } else {
      Carts.destroy({ where: { id: cartId } })
      .then(data => {
        res.status(200).json({
          message: "Cart has been deleted!",
          data: data
        });
      });
    }
  } catch (error) {
    next(error);
  }
};
