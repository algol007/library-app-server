module.exports = function(app) {
  const controller = require("../controllers/book");
  const auth = require('../middleware/middleware');
  const upload = require('../helper/upload')

  app.post("/api/library/admin/book", auth.authorized, upload.upload.single('image'), controller.createBook);
  app.get("/api/library/book", controller.readAllBooks);
  app.get("/api/library/book/:bookId", controller.readBookById);
  app.put("/api/library/admin/book/:bookId", auth.authorized, upload.upload.single('image'), controller.updateBook);
  app.delete("/api/library/admin/book/:bookId", auth.authorized, controller.deleteBook);
};
