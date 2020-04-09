// const redis = require('redis');
// const client = redis.createClient(process.env.PORT_REDIS);
// const { ErrorHandler } = require('./error');

// exports.chaceGetAllBooks = (req, res, next) => {
//   client.get('getAllBooks', (err, data) => {
//     console.log(data);
//     if(err){
//       throw new ErrorHandler(500, 'Cant get data from redis');
//     }
//     else if(data !== null){
//       res.status(200).json({
//         data: JSON.parse(data),
//         message: 'Alhamdulillah'
//       })
//     }
//     else{
//       next();
//     }
//   }) 
// };

// exports.clearGetAllBooks = (req, res, next) => {
//   client.del('getAllBooks');
//   next();
// };