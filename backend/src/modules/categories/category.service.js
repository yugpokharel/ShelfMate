const categoryRepository = require('./category.repository');
const ApiError = require('../../utils/ApiError');

const createCategory = async (payload) => categoryRepository.createCategory(payload);

const getCategories = async ({ activeOnly = true } = {}) => {
  const filter = activeOnly ? { isActive: true } : {};
  return categoryRepository.findAll(filter);
};

const getCategoryBySlug = async (slug) => {
  const category = await categoryRepository.findBySlug(slug);
  if (!category) throw new ApiError(404, 'Category not found');
  return category;
};

const updateCategory = async (id, payload) => {
  const updated = await categoryRepository.updateById(id, payload);
  if (!updated) throw new ApiError(404, 'Category not found');
  return updated;
};

const deleteCategory = async (id) => {
  const deleted = await categoryRepository.deleteById(id);
  if (!deleted) throw new ApiError(404, 'Category not found');
  return deleted;
};

module.exports = {
  createCategory,
  getCategories,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
};
