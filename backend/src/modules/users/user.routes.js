const express = require('express');
const controller = require('./user.controller');
const { verifyToken } = require('../../middleware/auth.middleware');

const router = express.Router();

router.use(verifyToken);
router.get('/profile', controller.getProfile);
router.patch('/profile', controller.updateProfile);
router.patch('/preferences', controller.updatePreferences);

module.exports = router;
