require('dotenv').config();
const Image = require('../data/Image');

// return an array of all the image objects
// [{url: "", caption: "", fileName: ""}]
exports.getImages = (req, res) => {
  Image.findAll()
    .then(arr => {
      res.json(arr);
    })
    .catch(err => console.log(err));
};

exports.postImage = (req, res) => {
  let img = req.processed;
  Image.pushNew(img)
    .then(mongoRes => {
      console.log('Push to mongoDB successful');
      res.send();
    })
    .catch(err => console.log(err));
};
