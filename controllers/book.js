const Books = require("../models").book;
const Category = require("../models").category;
const { Op } = require("sequelize");
const { handleError, ErrorHandler } = require("../helper/error");

const params = {
  exclude: ["createdAt", "updatedAt"],
  include: { model: Category, as: "bookCategory", attributes: ["name"] }
}

/**
 * ? search is String
 * ? author,title,search,year is Number
 */
exports.readAllBooks = (req, res, next) => {
  const { author, title, search, year } = req.query;

  const limit = req.query.limit || 8;
  const page = req.query.page || 1;
  const offset = (page - 1) * limit;

  const response = (data) => {
    const pages = Math.ceil(data.count / limit);
    if (page > pages) {
      next();
    } else {
      res.status(200).send({
        limit: limit,
        offset: offset,
        page: `${page} of ${pages}`,
        books: data
      });
    }
  }

  if (search) {
    Books.findAndCountAll({
      where: { [Op.or]: [{ title: { [Op.substring]: search } }] },
      offset: offset,
      params
    })
    .then(data => response(data))
  } else if (author) {
    Books.findAndCountAll({
      order: [["author", author]],
      offset: offset,
      params
    })
    .then(data => response(data))
  } else if (title) {
    Books.findAndCountAll({
      order: [["title", title]],
      offset: offset,
      params
    })
    .then(data => response(data))
  } else if (year) {
    Books.findAndCountAll({
      order: [["publishedAt", year]],
      offset: offset,
      params
    })
    .then(data => response(data))
  } else {
    Books.findAndCountAll({
      order: [["createdAt", 'DESC']],
      offset: offset,
      params
    })
    .then(data => response(data))
  }
};

/**
 * @param bookId is Number
 */
exports.readBookById = async (req, res, next) => {
  const bookId = req.params.bookId;
  try {
    const book = await Books.findOne({
      where: { id: bookId }
    });
    if (!book) {
      throw new ErrorHandler(404, "Book not found!");
    } else {
      Books.findOne({
        where: { id: bookId },
        params
      })
      .then(data => {
        res.status(200).json({ data: data });
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @param price,publishedAt,totalPage,categoryId is Number
 * @param title,author,isbn,description,language,publishedBy is String
 */
exports.createBook = (req, res, next) => {
  const { title, author, isbn, totalPage, categoryId, price, description, language, publishedAt, publishedBy } = req.body;

  Books.create({
    image: `${process.env.BASE_URL}uploads/${req.file.filename}`,
    isAvailable: 1,
    title, author, isbn, totalPage, categoryId, price, description, language, publishedBy, publishedAt
  })
    .then(data => {
      res.status(201).send({
        message: "Book has been added!",
        data: data
      });
    })
};

/**
 * @param price,publishedAt,totalPage,categoryId is Number
 * @param title,author,isbn,description,language,publishedBy is String
 */
exports.updateBook = async (req, res, next) => {
  const bookId = req.params.bookId;
  const { title, author, isbn, totalPage, categoryId, price, description, language, publishedAt, publishedBy } = req.body;

  try {
    const book = await Books.findOne({
      where: { id: bookId }
    });
    if (!book) {
      throw new ErrorHandler(404, "Book not found!");
    } else {
      Books.update({
        image: `${process.env.BASE_URL}uploads/${req.file.filename}`,
        isAvailable: 1,
        title, author, isbn, totalPage, categoryId, price, description, language, publishedBy, publishedAt
      },
      { where: { id: bookId } })
      .then(data => {
        res.status(200).send({
          message: "Book has been updated!",
          data: data
        });
      });
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @param bookId is Number
 */
exports.deleteBook = async (req, res, next) => {
  const bookId = req.params.bookId;
  try {
    const book = await Books.findOne({
      where: { id: bookId }
    });
    if (!book) {
      throw new ErrorHandler(404, "Book not found!");
    } else {
      Books.destroy({ where: { id: bookId } })
      .then(data => {
        res.status(200).send({
          message: "Book has been deleted!",
          data: data
        });
      });
    }
  } catch (error) {
    next(error);
  }
};
