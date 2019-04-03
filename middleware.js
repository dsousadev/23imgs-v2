const multer = require('multer');
const upload = multer();
const sharp = require('sharp');

// resizes image and puts the promise on the request 
const resizeImage = (req, res, next) => {
  req.resized = sharp(req.file.buffer)
    .resize(615, 615, { fit: 'outside' })
    .toBuffer();
  next();
};

// takes a request object and returns an object in proper format
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
