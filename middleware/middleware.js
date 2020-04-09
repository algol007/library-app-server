const jwt = require('jsonwebtoken');
const { ErrorHandler } = require('../helper/error');
require('dotenv').config();

exports.authorized = (req, res, next) => {
  const header = req.headers['baca-bismillah'];

  if(!header){
    throw new ErrorHandler(400, "Anda lupa baca bismillah.");
  } else {
    jwt.verify(header, process.env.SECRET_KEY, (err, decoded) => {
      if(err){
        throw new ErrorHandler(401, "Wrong token!");
      } else {
        req.userId = decoded.id;
        next();
      }
    })
  }
}