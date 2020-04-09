const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { handleError, ErrorHandler } = require("./helper/error");

app.use(morgan("dev"));
app.use(bodyParser.json({limit: '50mb'}));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cors());
app.use('/uploads', express.static('uploads'));

require("./router/user")(app);
require("./router/book")(app);
require("./router/category")(app);
require("./router/cart")(app);

app.get("/error", (err, req, res, next) => {
  throw new ErrorHandler(500, "Internal server error");
});

app.get("*", (req, res) => {
  throw new ErrorHandler(404, "Page Not Found");
});

app.use((err, req, res, next) => {
  handleError(err, res);
});

module.exports = app;
