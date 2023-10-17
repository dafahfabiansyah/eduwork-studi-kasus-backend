const router = require('express').Router();
const categoryController = require('./controller');

// create
router.post('/categories', categoryController.store);
// read
router.get('/categories', categoryController.index);
// update
router.put('/categories/:id', categoryController.update);
// delete
router.delete('/categories/:id', categoryController.destroy);

module.exports = router;
