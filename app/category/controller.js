const Categories = require('./model');

// create
const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let category = new Categories(payload);

    await category.save();
    return res.json(category);
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
    let category = await Categories.find();
    return res.json(category);
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

// update
const update = async (req, res, next) => {
  try {
    let payload = req.body;
    let category = await Categories.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });

    return res.json(category);
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
    let category = await Categories.findByIdAndDelete(req.params.id);
    return res.json(category);
  } catch (error) {
    return res.json({
      error: 1,
      message: error.message,
      fields: error.errors,
    });
  }
};

module.exports = {
  store,
  index,
  update,
  destroy,
};
