const Books = require("../models").book;
const Category = require("../models").category;
const { Op } = require("sequelize");
const { handleError, ErrorHandler } = require("../helper/error");

// Get all books data
exports.getAllBooks = (req, res, next) => {
  // console.log("Get all books data");
  const orderByTitle = req.query.title;
  const orderByAuthor = req.query.author;
  const orderByYear = req.query.year;
  const search = req.query.search;
  const limit = 8;
  const page = req.query.page;
  let offset = (page - 1) * limit;

  if (orderByTitle) {
    Books.findAndCountAll({
      order: [["title", orderByTitle]],
      exclude: ["createdAt", "updatedAt"],
      include: { model: Category, as: "bookCategory", attributes: ["name"] },
      limit: limit,
      offset: offset
    })
      .then(data => {
        const pages = Math.ceil(data.count / limit);
        if (page > pages) {
          next();
        } else {
          res.status(200).send({
            // page: `${page} of ${pages}`,
            message: "Order book by title",
            books: data
          });
        }
      })
      .catch(() => {
        throw new ErrorHandler(500, "Internal server error");
      });
  } else if (orderByAuthor) {
    Books.findAndCountAll({
      order: [["author", orderByAuthor]],
      exclude: ["createdAt", "updatedAt"],
      include: { model: Category, as: "bookCategory", attributes: ["name"] },
      limit: limit,
      offset: offset
    })
      .then(data => {
        const pages = Math.ceil(data.count / limit);
        if (page > pages) {
          next();
        } else {
          res.status(200).send({
            // page: `${page} of ${pages}`,
            message: "Order book by author",
            books: data
          });
        }
      })
      .catch(() => {
        throw new ErrorHandler(500, "Internal server error");
      });
  } else if (orderByYear) {
    Books.findAndCountAll({
      order: [["publishedAt", orderByYear]],
      exclude: ["createdAt", "updatedAt"],
      include: { model: Category, as: "bookCategory", attributes: ["name"] },
      limit: limit,
      offset: offset
    })
      .then(data => {
        const pages = Math.ceil(data.count / limit);
        if (page > pages) {
          next();
        } else {
          res.status(200).send({
            page: `${page} of ${pages}`,
            message: "Order book by year",
            books: data
          });
        }
      })
      .catch(() => {
        throw new ErrorHandler(500, "Internal server error");
      });
  } else if (search) {
    Books.findAndCountAll({
      where: {
        [Op.or]: [
          { title: { [Op.substring]: search } },
          { description: { [Op.substring]: search } }
        ]
      },
      exclude: ["createdAt", "updatedAt"],
      include: { model: Category, as: "bookCategory", attributes: ["name"] }
    })
      .then(data => {
        res.status(200).send({
          message: "Search books",
          books: data
        });
      })
      .catch(() => {
        throw new ErrorHandler(500, "Internal server error");
      });
  } else if (page) {
    Books.findAndCountAll({
      exclude: ["createdAt", "updatedAt"],
      include: { model: Category, as: "bookCategory", attributes: ["name"] },
      limit: limit,
      offset: offset
    })
      .then(data => {
        const pages = Math.ceil(data.count / limit);
        if (page > pages) {
          next();
        } else {
          res.status(200).send({
            page: `${page} of ${pages}`,
            books: data
          });
        }
      })
      .catch(() => {
        throw new ErrorHandler(500, "Internal server error");
      });
  } else {
    Books.findAndCountAll({
      exclude: ["createdAt", "updatedAt"],
      include: { model: Category, as: "bookCategory", attributes: ["name"] },
    })
      .then(data => {
        res.status(200).send({
          books: data
        });
      })
      .catch(() => {
        throw new ErrorHandler(500, "Internal server error");
      });
  }
};

exports.getBookById = async (req, res, next) => {
  // console.log("Get book data by Id");
  const bookId = req.params.bookId;
  try {
    const book = await Books.findOne({
      where: {
        id: bookId
      }
    });
    if (!book) {
      throw new ErrorHandler(404, "Book not found!");
    } else {
      Books.findOne({
        where: {
          id: bookId
        },
        exclude: ["createdAt", "updatedAt"],
        include: { model: Category, as: "bookCategory", attributes: ["name"] },
        }).then(data => {
        res.status(200).json({
          data: data
        });
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.getBooksByCategory = (req, res, next) => {
  // console.log("Get all books data");
  const categoryId = req.params.categoryId;

  Books.findAll({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    where: {
      categoryId: categoryId
    }
  })
    .then(data => {
      res.status(200).send({
        books: data
        // message: orderByTitle
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, "Internal server error");
    });
};

exports.createBook = (req, res, next) => {
  Books.create({
    title: req.body.title,
    image: `http://localhost:5000/uploads/${req.file.filename}`,
    // image: req.image,
    author: req.body.author,
    isbn: req.body.isbn,
    isAvailable: 1,
    totalPage: req.body.totalPage,
    categoryId: req.body.categoryId,
    price: req.body.price,
    description: req.body.description,
    language: req.body.language,
    publishedBy: req.body.publishedBy,
    publishedAt: req.body.publishedAt
  })
    .then(data => {
      res.status(201).send({
        message: "Book has been added!",
        data: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, "Internal server error");
    });
};

exports.updateBook = async (req, res, next) => {
  const bookId = req.params.bookId;
  // console.log(eventName);
  try {
    const book = await Books.findOne({
      where: {
        id: bookId
      }
    });
    if (!book) {
      throw new ErrorHandler(404, "Book not found!");
    } else {
      Books.update(
        {
          title: req.body.title,
          image: `http://localhost:5000/uploads/${req.file.filename}`,
          author: req.body.author,
          isbn: req.body.isbn,
          isAvailable: 1,
          totalPage: req.body.totalPage,
          categoryId: req.body.categoryId,
          price: req.body.price,
          description: req.body.description,
          language: req.body.language,
          publishedBy: req.body.publishedBy,
          publishedAt: req.body.publishedAt
        },
        {
          where: {
            id: bookId
          }
        }
      ).then(data => {
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

exports.deleteBook = async (req, res, next) => {
  const bookId = req.params.bookId;
  // console.log(eventName);
  try {
    const book = await Books.findOne({
      where: {
        id: bookId
      }
    });
    if (!book) {
      throw new ErrorHandler(404, "Book not found!");
    } else {
      Books.destroy({
        where: {
          id: bookId
        }
      }).then(data => {
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
