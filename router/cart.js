module.exports = function(app) {
  const controller = require("../controllers/cart");
  const auth = require('../middleware/middleware');
  const redis = require('../helper/redis');

  app.post("/api/library/cart", auth.authorized, controller.createCart, redis.clearGetAllCarts);
  app.get("/api/library/user/cart/:userId", controller.getAllCart);
  app.get("/api/library/cart", controller.getAllUserCarts, redis.chaceGetAllCarts);
  app.get("/api/library/cart/:cartId", controller.getCartById);
  app.put("/api/library/cart/:cartId", auth.authorized, controller.updateCart, redis.clearGetAllCarts);
  app.patch("/api/library/cart/:cartId", auth.authorized, controller.cartApproved, redis.clearGetAllCarts);
  app.delete("/api/library/cart/:cartId", auth.authorized, controller.deleteCart, redis.clearGetAllCarts);
};
