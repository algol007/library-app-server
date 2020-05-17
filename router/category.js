module.exports = function(app) {
  const controller = require("../controllers/category");

  app.get("/api/library/category", controller.readAllCategories);
  app.get("/api/library/category/:categoryId", controller.readCategoryById);
  app.post("/api/library/admin/category", controller.createCategory);
  app.put("/api/library/admin/category/:categoryId", controller.updateCategory);
  app.delete("/api/library/admin/category/:categoryId", controller.deleteCategory);
};
