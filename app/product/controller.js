const path = require('path');
const fs = require('fs');
const Product = require('./model');
const config = require('../config');
const Category = require('../category/model');
const Tag = require('../tag/model');
const { mongoose } = require('mongoose');

//create
const store = async (req, res, next) => {
  try {
    let payload = req.body;
    if (payload.category) {
      let category = await Category.findOne({ name: { $regex: payload.category, $options: 'i' } });
      if (category) {
        payload = { ...payload, category: category._id };
      } else {
        delete payload.category;
      }
    }
    if (payload.tag && payload.tag.length > 0) {
      let tag = await Category.find({ name: { $in: payload.tag } });
      if (tag.length) {
        payload = { ...payload, tag: tag.map((tag) => tag._id) };
      } else {
        delete payload.tag;
      }
    }
    if (req.file) {
      let tmp_path = req.file.path;
      let originalText = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
      let filename = req.file.filename + '.' + originalText; // Fixed the variable name
      let target_path = path.resolve(config.rootPath, `public/images/products/${filename}`);

      const source = fs.createReadStream(tmp_path);
      const destination = fs.createWriteStream(target_path);
      source.pipe(destination);

      source.on('end', async () => {
        try {
          let product = new Product({ ...payload, image_url: filename });
          await product.save(); // Changed Product.save() to product.save()
          return res.json(product);
        } catch (error) {
          fs.unlink(target_path);
          if (error && error.name === 'ValidationError') {
            return res.json({
              error: 1,
              message: error.message,
              fields: error.errors,
            });
          }
          next(error);
        }
      });
      source.on('error', async () => {
        fs.unlink(target_path);
        next(error);
      });
    } else {
      let product = new Product(payload);
      await product.save();
      return res.json(product);
    }
  } catch (error) {
    if (error && error.name === 'ValidationError') {
      return res.json({
        error: 1,
        message: error.message,
        fields: error.errors,
      });
    }
    next(error);
  }
};

// read
const index = async (req, res, next) => {
  try {
    let { skip = 0, limit = 10 } = req.query;
    let product = await Product.find().skip(parseInt(skip)).limit(parseInt(limit)).populate('category').populate('tag');
    return res.json(product);
  } catch (error) {
    next(error);
  }
};

// update
const update = async (req, res, next) => {
  try {
    let payload = req.body;
    let { id } = req.params;
    if (payload.category) {
      let category = await Category.findOne;
      ({ name: { $regex: payload.category, $options: 'i' } });
      if (category) {
        payload = { ...payload, category: category._id };
      } else {
        delete payload.category;
      }
    }
    if (payload.tag && payload.tag.length > 0) {
      let tag = await Category.find({ name: { $in: payload.tag } });
      if (tag.length) {
        payload = { ...payload, tag: tag.map((tag) => tag._id) };
      } else {
        delete payload.tag;
      }
    }
    if (req.file) {
      let tmp_path = req.file.path;
      let originalText = req.file.originalname.split('.')[req.file.originalname.split('.').length - 1];
      let filename = req.file.filename + '.' + originalText;
      let target_path = path.resolve(config.rootPath, `public/images/products/${filename}`);

      const source = fs.createReadStream(tmp_path);
      const destination = fs.createWriteStream(target_path);
      source.pipe(destination);

      source.on('end', async () => {
        try {
          let product = await Product.findById(id);
          let currentImage = `${config.rootPath}public/images/products/${product.image_url}`;
          if (fs.existsSync(currentImage)) {
            fs.unlinkSync(currentImage);
          }
          product = await Product.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators: true,
          });
          return res.json(product);
        } catch (error) {
          // fs.unlink(target_path);
          if (error && error.name === 'ValidationError') {
            return res.json({
              error: 1,
              message: error.message,
              fields: error.errors,
            });
          }
          next(error);
        }
      });
      source.on('error', async () => {
        fs.unlink(target_path);
        next(error);
      });
    } else {
      let product = await Product.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
      });
      return res.json(product);
    }
  } catch (error) {
    if (error && error.name === 'ValidationError') {
      return res.json({
        error: 1,
        message: error.message,
        fields: error.errors,
      });
    }
    next(error);
  }
};

// delete
const destroy = async (req, res, next) => {
  try {
    let product = await Product.findByIdAndDelete({ _id: req.params.id });
    let currentImage = `${config.rootPath}public/images/products/${product.image_url}`;
    if (fs.existsSync(currentImage)) {
      fs.unlinkSync(currentImage);
    }
    return res.json(product);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  store,
  index,
  update,
  destroy,
};
