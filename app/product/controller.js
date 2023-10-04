const productModel = require('./model');

const store = (req, res) => {
  const product = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image_url: req.file.path,
  };
  productModel.create(product, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

module.exports = {
  store,
};
