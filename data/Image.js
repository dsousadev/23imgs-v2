const mongoose = require('mongoose');
const db = require('../server.js');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
  url: String,
  caption: String,
  number: Number,
  fileName: String,
  base64: String
});

// saves an image object { url, caption, number, fileName } to mongo
// returns a promise
ImageSchema.statics.pushNew = function pushNew(img) {
  img = new Image(img);
  return this.find().then(arr => {
    if (arr.length >= 23) {
      return this.deleteOne({ number: arr[0].number }).then(() => {
        return img.save();
      });
    } else {
      return img.save();
    }
  });
};

// returns entire images collection in order of most recent
ImageSchema.statics.findAll = function returnAll() {
  return this.find().then(arr => {
    return arr.reverse();
  });
};

const Image = db.model('Image', ImageSchema, 'images');

module.exports = Image;
