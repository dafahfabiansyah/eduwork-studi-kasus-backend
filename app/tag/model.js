const mongoose = require('mongoose');

const tagSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [3, 'Panjang category minimal 3 karakter'],
    maxLength: [20, 'Panjang category maximal 20 karakter'], // Perbaikan typo di sini
    required: [true, 'Category harus diisi'], // Perbaikan typo di sini
  },
});

const Tag = mongoose.model('Tag', tagSchema);

module.exports = Tag;
