const User = require('../users/user.model');

const createUser = async (payload) => User.create(payload);

const findByEmail = async (email, includePassword = false) => {
  const query = User.findOne({ email: email.toLowerCase().trim() });
  if (includePassword) query.select('+password +refreshToken');
  return query;
};

const findById = async (id, includeSensitive = false) => {
  const query = User.findById(id);
  if (includeSensitive) query.select('+password +refreshToken');
  return query;
};

const updateRefreshToken = async (id, refreshToken) =>
  User.findByIdAndUpdate(
    id,
    { refreshToken },
    { new: true, runValidators: true }
  );

module.exports = {
  createUser,
  findByEmail,
  findById,
  updateRefreshToken,
};
