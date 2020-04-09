module.exports = function(app) {
  const controller = require("../controllers/cart");
  const auth = require('../middleware/middleware');

  app.post("/api/library/cart", auth.authorized, controller.createCart);
  app.get("/api/library/cart", controller.getAllCart);
  app.get("/api/library/cart/:cartId", controller.getCartById);
  app.put("/api/library/cart/:cartId", auth.authorized, controller.updateCart);
  app.delete("/api/library/cart/:cartId", auth.authorized, controller.deleteCart);
};
