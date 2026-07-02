const bcrypt = require('bcryptjs');
const authRepository = require('./auth.repository');
const { generateAccessToken, generateRefreshToken } = require('../../utils/jwt');
const ApiError = require('../../utils/ApiError');

const buildTokenPayload = (user) => ({ id: user._id.toString(), role: user.role });

const register = async ({ name, email, password, postcode, dietaryPreferences }) => {
  const existingUser = await authRepository.findByEmail(email);
  if (existingUser) {
    throw new ApiError(409, 'Email already in use');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await authRepository.createUser({
    name,
    email,
    password: hashedPassword,
    postcode,
    dietaryPreferences: dietaryPreferences || [],
  });

  const payload = buildTokenPayload(user);
  const accessToken = generateAccessToken(payload);
  const refreshToken = generateRefreshToken(payload);

  await authRepository.updateRefreshToken(user._id, refreshToken);

  return {
    user,
    tokens: { accessToken, refreshToken },
  };
};

module.exports = {
  register,
};
