const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(res, file, cb){
    cb(null, './uploads/');
  },
  filename: function(req, file, cb){
    cb(null, new Date().toISOString() + file.originalname.replace(/ /g, '-'));
  },
});

const fileFilter = (req, file, cb) => {
  const allowTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(!allowTypes.includes(file.mimetype)) {
    cb(null, false);
  } else {
    cb(null, true);
  }
};

exports.upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 10
  },
  fileFilter: fileFilter,
});