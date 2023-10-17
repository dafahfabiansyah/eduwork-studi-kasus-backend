const Tag = require('./model');

// create
const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let tag = new Tag(payload);

    await tag.save();
    return res.json(tag);
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
    let tag = await Tag.find();
    return res.json(tag);
  } catch (error) {
    return res.json({
      error: 1,
      message: error.message,
      fields: error.errors,
    });
  }
};

// upate
const update = async (req, res, next) => {
  try {
    let payload = req.body;
    let tag = await Tag.findByIdAndUpdate(req.params.id, payload, { new: true, runValidators: true });

    return res.json(tag);
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
    let tag = await Tag.findByIdAndDelete(req.params.id);
    return res.json(tag);
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
