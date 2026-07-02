const authService = require('./auth.service');
const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');

const register = asyncHandler(async (req, res) => {
  const result = await authService.register(req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, result, 'User registered successfully'));
});

const login = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);
  return res.status(200).json(new ApiResponse(200, result, 'Login successful'));
});

const refresh = asyncHandler(async (req, res) => {
  const token = req.body.refreshToken || req.headers['x-refresh-token'];
  const result = await authService.refreshSession(token);
  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Token refreshed successfully'));
});

const logout = asyncHandler(async (req, res) => {
  const result = await authService.logout(req.user.id);
  return res.status(200).json(new ApiResponse(200, result, 'Logout successful'));
});

const getMe = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, { user: req.user }, 'Current user fetched'));
});

module.exports = {
  register,
  login,
  refresh,
  logout,
  getMe,
};
