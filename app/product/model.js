const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const productSchema = Schema(
  {
    name: {
      type: String,
      minLength: [3, 'Panjang product minimal 3 karakter'],
      required: [true, 'Nama makanan harus di isi'],
    },
    description: {
      type: String,
      maxLength: [1000, 'Panjang deskripsi maximal 1000 karakter'],
    },
    price: {
      type: Number,
      default: 0,
    },
    image_url: String,
  },
  { timestamps: true }
);

module.exports = model('Product', productSchema);
