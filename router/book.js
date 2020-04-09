module.exports = function(app) {
  const controller = require("../controllers/book");
  const auth = require('../middleware/middleware');
  const redis = require('../helper/redis');
  const multer = require('multer');

  const storage = multer.diskStorage({
    destination: function(res, file, cb){
      cb(null, './uploads/');
    },
    filename: function(req, file, cb){
      cb(null, new Date().toISOString() + '-' + file.originalname);
    },
  });

  const fileFilter = (req, file, cb) => {
    const allowTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if(!allowTypes.includes(file.mimetype)) {
      cb(null, false);
    } else {
      cb(null, true);
    }
  };

  const upload = multer({ 
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 10
    }, 
    fileFilter: fileFilter,
  });

  app.post("/api/library/admin/book", upload.single('image'), controller.createBook);
  app.get("/api/library/book", controller.getAllBooks);
  app.get(
    "/api/library/book/category/:categoryId",
    controller.getBooksByCategory
  );
  app.get("/api/library/book/:bookId", controller.getBookById);
  app.put("/api/library/admin/book/:bookId", controller.updateBook);
  app.delete("/api/library/admin/book/:bookId", controller.deleteBook);
};
