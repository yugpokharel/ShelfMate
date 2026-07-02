const bcrypt = require('bcryptjs');
const authRepository = require('./auth.repository');
const {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} = require('../../utils/jwt');
const ApiError = require('../../utils/ApiError');

const buildTokenPayload = (user) => ({ id: user._id.toString(), role: user.role });

const buildTokens = (user) => {
  const payload = buildTokenPayload(user);
  return {
    accessToken: generateAccessToken(payload),
    refreshToken: generateRefreshToken(payload),
  };
};

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

  const tokens = buildTokens(user);
  await authRepository.updateRefreshToken(user._id, tokens.refreshToken);

  return { user, tokens };
};

const login = async ({ email, password }) => {
  const user = await authRepository.findByEmail(email, true);
  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, 'Invalid email or password');
  }

  const tokens = buildTokens(user);
  await authRepository.updateRefreshToken(user._id, tokens.refreshToken);

  const safeUser = await authRepository.findById(user._id);
  return { user: safeUser, tokens };
};

const refreshSession = async (refreshToken) => {
  if (!refreshToken) {
    throw new ApiError(401, 'Refresh token is required');
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch (error) {
    throw new ApiError(401, 'Invalid refresh token');
  }

  const user = await authRepository.findById(decoded.id, true);
  if (!user || !user.refreshToken || user.refreshToken !== refreshToken) {
    throw new ApiError(401, 'Refresh token is not recognized');
  }

  const tokens = buildTokens(user);
  await authRepository.updateRefreshToken(user._id, tokens.refreshToken);

  return { tokens };
};

const logout = async (userId) => {
  await authRepository.updateRefreshToken(userId, null);
  return { loggedOut: true };
};

module.exports = {
  register,
  login,
  refreshSession,
  logout,
};
