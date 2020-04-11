const redis = require('redis');
const client = redis.createClient(process.env.PORT_REDIS);
const { ErrorHandler } = require('./error');

exports.chaceGetAllCarts = (req, res, next) => {
  client.get('getAllCarts', (err, data) => {
    console.log(data);
    if(err){
      throw new ErrorHandler(500, 'Cant get data from redis');
    }
    else if(data !== null){
      res.status(200).json({
        data: JSON.parse(data),
        message: 'Alhamdulillah'
      })
    }
    else{
      next();
    }
  }) 
};

exports.clearGetAllCarts = (req, res, next) => {
  client.del('getAllCarts');
  next();
};