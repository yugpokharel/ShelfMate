const express = require('express');
const authController = require('./auth.controller');
const { verifyToken } = require('../../middleware/auth.middleware');
const validate = require('../../middleware/validate.middleware');
const {
  registerSchema,
  loginSchema,
  refreshSchema,
} = require('./auth.validator');

const router = express.Router();

router.post('/register', validate(registerSchema), authController.register);
router.post('/login', validate(loginSchema), authController.login);
router.post('/refresh', validate(refreshSchema), authController.refresh);
router.post('/logout', verifyToken, authController.logout);
router.get('/me', verifyToken, authController.getMe);

module.exports = router;
