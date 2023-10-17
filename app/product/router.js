const express = require('express');
const router = express.Router();
const multer = require('multer');
const os = require('os');

const productController = require('./controller');
// create
router.post('/products', multer({ dest: os.tmpdir() }).single('image'), productController.store);
// read
router.get('/products', productController.index);
// update
router.put('/products/:id', multer({ dest: os.tmpdir() }).single('image'), productController.update);
// delete
router.delete('/products/:id', productController.destroy);

module.exports = router;
