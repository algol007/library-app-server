require('dotenv').config;
const Users = require("../models").user;
const bcrypt = require("bcryptjs");
const { handleError, ErrorHandler } = require("../helper/error");
const jwt = require("jsonwebtoken");
const nodemailer = require('nodemailer'); 

exports.signUp = (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  Users
    .create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, salt),
      image: req.body.image,
      role: req.body.role || "user",
      isActive: 0
    })
    .then(data => {
      const token = jwt.sign( {id: data.id}, process.env.SECRET_KEY );

      var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASS,
        }
      });
      
      var mailOptions = {
        from: process.env.EMAIL,
        to: req.body.email,
        subject: 'LIBRARY APP',
        html: `Click this link to activate your account <a href="http://localhost:8080/auth/login?token=${token}">Activate Account</a>`
        // html: `Click this link to activate your account <a href="http://localhost:5000/api/library/user/activation?token=${token}">Activate Account</a>`        
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });

      res.status(201).send({
        user: data.email,
        message: "User has been created!"
      });
    })
    .catch(() => {
      throw new ErrorHandler(500, "Internal server error");
    });
};

exports.signIn = async (req, res, next) => {
  try{
    const user = await Users.findOne({
      where: {
        email: req.body.email
      }
    });
    if (!user) {
      throw new ErrorHandler(403, "You are not registered! Please signup.");
    } else {
      Users
        .findOne({
          where: {
            email: req.body.email
          }
        })
        .then(data => {
          if (data) {
          const authorized = bcrypt.compareSync(
            req.body.password,
            data.password
          );
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
              res.status(401).send({
                message: "Please activate your email!",
              });  
            }  
          } else {
            res.status(401).json({
              message: "Wrong Password!"
            });
          }
        }
      });
    }        
  } catch(error) {
    console.log(error);
  }
};

exports.getUserById = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await Users.findOne({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new ErrorHandler(404, "User not found!");
    } else {
      Users.findOne({
        where: {
          id: userId
        }
      }).then(data => {
        const token = jwt.sign( {id: data.id}, process.env.SECRET_KEY );
        res.status(200).send({
          user: data,
          // token: token,
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
    Users.findOne({
      where: {
        id: req.userId
      }
    });
    Users.update(
      {
        isActive: 1
      },
      {
        where: {
          id: req.userId
        }
      }
    ).then(data => {
      res.status(200).send({
        data: data,
      });
    });
};

exports.updateUser = async (req, res, next) => {
  const salt = bcrypt.genSaltSync(10);
  const userId = req.params.userId;

  try {
    const user = await Users.findOne({
      id: userId
    });
    if (!user) {
      throw new ErrorHandler(404, "User not found!");
    } else {
      Users.update(
        {
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, salt),
          image: req.body.image,
          role: req.body.user || "user",
          isActive: 1
        },
        {
          where: {
            id: userId
          }
        }
      ).then(data => {
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

//===================For admin only========================

exports.getAllUser = (req, res, next) => {
  Users.findAll()
    .then(data => {
      res.status(200).send({
        Users: data
      });
    })
    .catch(err => {
      err.status(500).json({
        message: `Error ${err}`
      });
    });
};

exports.deleteUser = async (req, res, next) => {
  const userId = req.params.userId;

  try {
    const user = await Users.findOne({
      where: {
        id: userId
      }
    });
    if (!user) {
      throw new ErrorHandler(404, "User not found!");
    } else {
      Users.destroy({
        where: {
          id: userId
        }
      }).then(data => {
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
