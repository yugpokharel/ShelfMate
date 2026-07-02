const express = require('express');
const controller = require('./category.controller');
const { verifyToken } = require('../../middleware/auth.middleware');
const ApiError = require('../../utils/ApiError');

const router = express.Router();

const requireAdmin = (req, _res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new ApiError(403, 'Admin access required'));
  }
  return next();
};

router.get('/', controller.getCategories);
router.get('/:slug', controller.getCategoryBySlug);
router.post('/', verifyToken, requireAdmin, controller.createCategory);
router.patch('/:id', verifyToken, requireAdmin, controller.updateCategory);
router.delete('/:id', verifyToken, requireAdmin, controller.deleteCategory);

module.exports = router;
