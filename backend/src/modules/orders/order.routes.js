const express = require('express');
const controller = require('./order.controller');
const { verifyToken } = require('../../middleware/auth.middleware');

const router = express.Router();

router.use(verifyToken);
router.post('/', controller.placeOrder);
router.get('/', controller.getOrders);
router.get('/:id', controller.getOrderById);
router.patch('/:id/cancel', controller.cancelOrder);

module.exports = router;
