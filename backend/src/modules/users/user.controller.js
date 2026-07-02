const userService = require('./user.service');
const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');

const getProfile = asyncHandler(async (req, res) => {
  const user = await userService.getProfile(req.user.id);
  return res.status(200).json(new ApiResponse(200, user, 'Profile fetched successfully'));
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await userService.updateProfile(req.user.id, req.body);
  return res.status(200).json(new ApiResponse(200, user, 'Profile updated successfully'));
});

const updatePreferences = asyncHandler(async (req, res) => {
  const user = await userService.updatePreferences(req.user.id, req.body.dietaryPreferences || []);
  return res.status(200).json(new ApiResponse(200, user, 'Preferences updated successfully'));
});

module.exports = {
  getProfile,
  updateProfile,
  updatePreferences,
};
