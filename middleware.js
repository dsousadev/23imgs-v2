const multer = require('multer');
const upload = multer();
const sharp = require('sharp');

// resizes image, puts the promise on the request object
const resizeImage = (req, res, next) => {
  req.resized = sharp(req.file.buffer)
    .resize(615, 615, { fit: 'outside' })
    .toBuffer();
  next();
};

// returns request object in proper format
const processRequest = (req, res, next) => {
  req.resized
    .then(buffer => {
      let { file } = req;
      let { number, caption } = req.body;
      let sliceIndex = file.originalname.lastIndexOf('.');
      let fileType = file.originalname.slice(sliceIndex);
      let fileName = number + fileType;
      req.processed = {
        number,
        caption,
        fileName,
        base64: buffer.toString('base64')
      };
      next();
    })
    .catch(err => console.log(err));
};

module.exports = { processRequest, upload, resizeImage };
