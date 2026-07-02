const express = require('express');
const controller = require('./smartlist.controller');
const { verifyToken } = require('../../middleware/auth.middleware');

const router = express.Router();

router.use(verifyToken);
router.get('/', controller.getSmartList);
router.post('/add-to-cart', controller.addToCart);

module.exports = router;
