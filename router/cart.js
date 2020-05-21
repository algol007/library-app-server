module.exports = function(app) {
  const controller = require("../controllers/cart");
  const auth = require('../middleware/middleware');
  const redis = require('../helper/redis');

  app.post("/api/library/cart", auth.authorized, controller.createCart, redis.clearGetAllCarts);
  app.get("/api/library/cart", controller.readAllCart);
  app.get("/api/library/user/cart/:userId", controller.readCartById);
  app.patch("/api/library/cart/:cartId", auth.authorized, controller.updateCart, redis.clearGetAllCarts);
  app.delete("/api/library/cart/:cartId", auth.authorized, controller.deleteCart, redis.clearGetAllCarts);
};
