module.exports = function(app) {
  const controller = require("../controllers/user");
  const userVerify = require('../middleware/userVerify');
  const auth = require('../middleware/middleware');

  app.post("/api/library/auth/signup", userVerify.checkDuplicateEmail, controller.signUp);
  app.post("/api/library/auth/signin", controller.signIn);
  app.get("/api/library/admin/user", auth.authorized, controller.getAllUser);
  app.get("/api/library/user/:userId", controller.getUserById);
  app.patch("/api/library/user/activation", controller.userActivation);
  app.put("/api/library/user/:userId", auth.authorized, controller.updateUser);
  app.delete("/api/library/admin/user/:userId", auth.authorized, controller.deleteUser);
};
