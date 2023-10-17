const router = require('express').Router();
const tagController = require('./controller');

// create
router.post('/tags', tagController.store);
// read
router.get('/tags', tagController.index);
// update
router.put('/tags/:id', tagController.update);
// delete
router.delete('/tags/:id', tagController.destroy);

module.exports = router;
