module.exports = function(app) {
  const controller = require("../controllers/cart");
  const auth = require('../middleware/middleware');

  app.post("/api/library/cart", controller.createCart);
  app.get("/api/library/user/cart/:userId", controller.getAllCart);
  app.get("/api/library/cart", controller.getAllUserCarts);
  app.get("/api/library/cart/:cartId", controller.getCartById);
  app.put("/api/library/cart/:cartId", controller.updateCart);
  app.patch("/api/library/cart/:cartId", controller.cartApproved);
  app.delete("/api/library/cart/:cartId", controller.deleteCart);
};
