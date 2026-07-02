const express = require('express');
const controller = require('./product.controller');
const { verifyToken } = require('../../middleware/auth.middleware');
const ApiError = require('../../utils/ApiError');

const router = express.Router();

const requireAdmin = (req, _res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new ApiError(403, 'Admin access required'));
  }
  return next();
};

router.get('/', controller.getProducts);
router.get('/search', controller.searchProducts);
router.get('/:id', controller.getProductById);
router.post('/', verifyToken, requireAdmin, controller.createProduct);
router.patch('/:id', verifyToken, requireAdmin, controller.updateProduct);
router.delete('/:id', verifyToken, requireAdmin, controller.deleteProduct);

module.exports = router;
