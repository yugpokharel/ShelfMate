const userRepository = require('./user.repository');
const ApiError = require('../../utils/ApiError');

const getProfile = async (userId) => {
  const user = await userRepository.findById(userId);
  if (!user) throw new ApiError(404, 'User not found');
  return user;
};

const updateProfile = async (userId, payload) => {
  const user = await userRepository.updateById(userId, payload);
  if (!user) throw new ApiError(404, 'User not found');
  return user;
};

const updatePreferences = async (userId, dietaryPreferences) =>
  updateProfile(userId, { dietaryPreferences });

module.exports = {
  getProfile,
  updateProfile,
  updatePreferences,
};
