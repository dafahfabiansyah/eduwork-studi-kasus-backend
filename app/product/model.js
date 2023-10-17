const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const Category = require('../category/model');
const Tag = require('../tag/model');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [3, 'Panjang product minimal 3 karakter'],
      required: [true, 'Nama makanan harus di isi'],
    },
    description: {
      type: String,
      maxLength: [1000, 'Panjang deskripsi maksimal 1000 karakter'],
    },
    price: {
      type: Number,
      default: 0,
    },
    image_url: String,
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    tags: {
      type: Schema.Types.ObjectId,
      ref: 'Tag',
    },
  },
  { timestamps: true }
);

module.exports = model('Product', productSchema);
