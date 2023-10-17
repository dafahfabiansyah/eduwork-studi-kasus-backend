const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Panjang category minimal 3 karakter'],
    maxLength: [20, 'Panjang category maximal 20 karakter'],
    required: [true, 'category harus diisi'],
  },
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
