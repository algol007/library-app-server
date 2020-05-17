const Users = require("../models").user;
const { handleError, ErrorHandler } = require("../helper/error");
const jwt = require("jsonwebtoken");
const sendEmail = require('../helper/sendEmail')
const bcrypt = require("bcryptjs");
const salt = bcrypt.genSaltSync(10);

exports.signUp = (req, res, next) => {
  const { name, email, role, isActive } = req.body

  Users
    .create({
      name, email, role, isActive,
      password: bcrypt.hashSync(req.body.password, salt),
      image: `${process.env.BASE_URL}uploads/default-user.jpg`,
    })
    .then(data => {
      const token = jwt.sign( {id: data.id}, process.env.SECRET_KEY );
      sendEmail.sendMail(data.email, token)
      res.status(201).send({
        user: data.email,
        message: "User has been created!"
      });
    })
};

exports.signIn = async (req, res, next) => {
  try{
    const user = await Users.findOne({
      where: { email: req.body.email }
    });
    if (!user) {
      throw new ErrorHandler(403, "You are not registered! Please signup.");
    } else {
      Users
        .findOne({ where: { email: req.body.email } })
        .then(data => {
          if (data) {
          const authorized = bcrypt.compareSync( req.body.password, data.password );
          if (authorized) {
            const isActive = data.isActive;
            if(isActive == 1) {
              const token = jwt.sign( {id: data.id}, process.env.SECRET_KEY );
              res.status(200).send({
                user: data.id,
                token: token,
                message: "Login Successfuly!",
              });
            } else {
              throw new ErrorHandler(401, "Please activate your email.");
            }
          } else {
            throw new ErrorHandler(401, "Wrong Password.");
          }
        }
      });
    }
  } catch(error) {
    console.log(error);
  }
};

exports.readUserById = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await Users.findOne({
      where: { id: userId }
    });
    if (!user) {
      throw new ErrorHandler(404, "User not found!");
    } else {
      Users.findOne({ where: { id: userId } })
      .then(data => {
        const token = jwt.sign( {id: data.id}, process.env.SECRET_KEY );
        res.status(200).send({
          user: data,
        });
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.userActivation = (req, res, next) => {
  const header = req.query.token;
    if(!header){
      throw new ErrorHandler(400, "Anda lupa baca bismillah.");
    } else {
      jwt.verify(header, process.env.SECRET_KEY, (err, decoded) => {
        if(err){
          throw new ErrorHandler(401, "Wrong token!");
        } else {
          req.userId = decoded.id;
          console.log(req.userId);
        }
      })
    }
    Users.findOne({ where: { id: req.userId } });
    Users.update({ isActive: 1 },
      { where: { id: req.userId } })
      .then(data => {
        res.status(200).send({
        data: data,
      });
    });
};

exports.updateUser = async (req, res, next) => {
  const userId = req.params.userId;
  const { name, email, role, isActive } = req.body

  try {
    const user = await Users.findOne({
      id: userId
    });
    if (!user) {
      throw new ErrorHandler(404, "User not found!");
    } else {
      Users.update({
        name, email, role, isActive,
        password: bcrypt.hashSync(req.body.password, salt),
        image: `${process.env.BASE_URL}uploads/${req.file.filename}`,
      },
      { where: {id: userId } } )
      .then(data => {
        res.status(200).send({
          message: "User has been updated!",
          data: data
        });
      });
    }
  } catch (error) {
    next(error);
  }
};

exports.readAllUser = (req, res, next) => {
  Users.findAndCountAll()
  .then(data => {
    res.status(200).send({
      Users: data
    });
  })
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await Users.findOne({
      where: { id: userId }
    });
    if (!user) {
      throw new ErrorHandler(404, "User not found!");
    } else {
      Users.destroy({ where: { id: userId } })
      .then(data => {
        res.status(200).send({
          message: "User has been deleted!",
          data: data
        });
      });
    }
  } catch (error) {
    next(error);
  }
};
