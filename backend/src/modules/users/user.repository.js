const User = require('./user.model');

const findById = async (id) => User.findById(id);

const updateById = async (id, payload) =>
  User.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

module.exports = {
  findById,
  updateById,
};
