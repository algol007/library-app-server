const Users = require('../models').user;

exports.checkDuplicateEmail = (req, res, next) => {
  Users
    .findOne({
      where: {
        email: req.body.email
      }
    })
    .then(data => {
      if(data) {
        res.status(400).json({
          message: "Email has been registered! Please Login.."
        })
        return;
      }
      next();
    })
}