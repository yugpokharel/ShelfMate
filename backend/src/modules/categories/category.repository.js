const Category = require('./category.model');

const createCategory = async (payload) => Category.create(payload);

const findAll = async (filter = {}) => Category.find(filter).sort({ name: 1 });

const findBySlug = async (slug) => Category.findOne({ slug });

const findById = async (id) => Category.findById(id);

const updateById = async (id, payload) =>
  Category.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

const deleteById = async (id) => Category.findByIdAndDelete(id);

module.exports = {
  createCategory,
  findAll,
  findBySlug,
  findById,
  updateById,
  deleteById,
};
