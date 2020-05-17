const Categories = require("../models").category;
const Books = require("../models").book;
const { handleError, ErrorHandler } = require("../helper/error");

const params = {
  exclude: ["createdAt", "updatedAt"],
  include: { model: Books, as: "bookCategory", attributes: ["title"] }
}

exports.readAllCategories = (req, res, next) => {
  const limit = req.query.limit || 10;
  const page = req.query.page;
  const offset = (page - 1) * limit;

  Categories.findAndCountAll({
    order: [["createdAt", 'DESC']],
    offset: offset,
    params
  })
    .then(data => {
      const pages = Math.ceil(data.count / limit);
      res.status(200).send({
        page: `${page} of ${pages}`,
        categories: data
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, "Internal server error");
    });
};

exports.readCategoryById = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    const category = await Categories.findOne({
      where: { id: categoryId }
    });
    if (!category) {
      throw new ErrorHandler(404, "Category not found!");
    } else {
      Categories.findOne({
        params,
        where: { id: categoryId }
      }).then(data => {
        res.status(200).send({
          data: data
        });
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.createCategory = (req, res, next) => {

  Categories.create({ name: req.body.name })
  .then(data => {
    res.status(201).send({
      message: "New category added!",
      category: data
    });
  })
};

exports.updateCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    const category = await Categories.findOne({
      where: { id: categoryId }
    });
    if (!category) {
      throw new ErrorHandler(404, "Category not found!");
    } else {
      Categories.update(
        { name: req.body.name },
        { where: { id: categoryId }
      })
      .then(data => {
        res.status(200).send({
          message: "Category has been updated!",
          data: data
        });
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.deleteCategory = async (req, res, next) => {
  const categoryId = req.params.categoryId;

  try {
    const category = await Categories.findOne({
      where: { id: categoryId }
    });
    if (!category) {
      throw new ErrorHandler(404, "Category not found!");
    } else {
      Categories.destroy({ where: { id: categoryId } })
      .then(data => {
        res.status(200).send({
          data: data,
          message: "Category has been deleted!"
        });
      });
    }
  } catch (error) {
    next(error);
  }
};
