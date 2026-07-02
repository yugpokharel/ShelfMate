const authRepository = require('../modules/auth/auth.repository');
const { verifyAccessToken } = require('../utils/jwt');
const ApiError = require('../utils/ApiError');

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      throw new ApiError(401, 'Authorization token missing');
    }

    const decoded = verifyAccessToken(token);
    const user = await authRepository.findById(decoded.id);
    if (!user) {
      throw new ApiError(401, 'Invalid access token');
    }

    req.user = {
      id: user._id.toString(),
      role: user.role,
      email: user.email,
      name: user.name,
    };

    next();
  } catch (error) {
    next(error.statusCode ? error : new ApiError(401, 'Unauthorized'));
  }
};

const optionalAuth = async (req, _res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    if (!authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.split(' ')[1];
    const decoded = verifyAccessToken(token);
    const user = await authRepository.findById(decoded.id);

    if (user) {
      req.user = {
        id: user._id.toString(),
        role: user.role,
        email: user.email,
      };
    }

    next();
  } catch (_error) {
    next();
  }
};

module.exports = {
  verifyToken,
  optionalAuth,
};
