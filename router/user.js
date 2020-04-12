module.exports = function(app) {
  const controller = require("../controllers/user");
  const userVerify = require('../middleware/userVerify');
  const auth = require('../middleware/middleware');
  const multer = require('multer');

  const storage = multer.diskStorage({
    destination: function(res, file, cb){
      cb(null, './uploads/');
    },
    filename: function(req, file, cb){
      cb(null, new Date().toISOString());
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

  app.post("/api/library/auth/signup", userVerify.checkDuplicateEmail, controller.signUp);
  app.post("/api/library/auth/signin", controller.signIn);
  app.get("/api/library/admin/user", auth.authorized, controller.getAllUser);
  app.get("/api/library/user/:userId", controller.getUserById);
  app.patch("/api/library/user/activation", controller.userActivation);
  app.put("/api/library/user/:userId", auth.authorized, upload.single('image'), controller.updateUser);
  app.delete("/api/library/admin/user/:userId", auth.authorized, controller.deleteUser);
};
