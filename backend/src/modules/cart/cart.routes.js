const express = require('express');
const controller = require('./cart.controller');
const { verifyToken } = require('../../middleware/auth.middleware');

const router = express.Router();

router.use(verifyToken);
router.get('/', controller.getCart);
router.post('/add', controller.addItem);
router.patch('/item/:id', controller.updateItem);
router.delete('/item/:id', controller.removeItem);
router.delete('/clear', controller.clearCart);

module.exports = router;
