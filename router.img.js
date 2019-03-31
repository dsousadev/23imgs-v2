const Router = require('express').Router();
const imgController = require('./controllers/imgController');
const { upload, processRequest, resizeImage } = require('./middleware');

Router.get('/images/', imgController.getImages);
Router.post(
  '/upload/',
  upload.single('file'),
  resizeImage,
  processRequest,
  imgController.postImage
);

module.exports = Router;
