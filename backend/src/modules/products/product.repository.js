const Product = require('./product.model');

const buildFilter = ({ category, dietaryTags, minPrice, maxPrice, search, isActive = true } = {}) => {
  const filter = {};

  if (typeof isActive === 'boolean') filter.isActive = isActive;
  if (category) filter.category = category;
  if (dietaryTags && dietaryTags.length) filter.dietaryTags = { $in: dietaryTags };
  if (minPrice !== undefined || maxPrice !== undefined) {
    filter.price = {};
    if (minPrice !== undefined) filter.price.$gte = Number(minPrice);
    if (maxPrice !== undefined) filter.price.$lte = Number(maxPrice);
  }
  if (search) {
    filter.$text = { $search: search };
  }

  return filter;
};

const findAll = async ({ filter = {}, sort = { createdAt: -1 }, skip = 0, limit = 20 } = {}) =>
  Product.find(filter)
    .populate('category')
    .sort(sort)
    .skip(skip)
    .limit(limit);

const count = async (filter = {}) => Product.countDocuments(filter);

const findById = async (id) => Product.findById(id).populate('category');

const findBySlug = async (slug) => Product.findOne({ slug }).populate('category');

const createProduct = async (payload) => Product.create(payload);

const updateById = async (id, payload) =>
  Product.findByIdAndUpdate(id, payload, { new: true, runValidators: true });

const deleteById = async (id) => Product.findByIdAndDelete(id);

module.exports = {
  buildFilter,
  findAll,
  count,
  findById,
  findBySlug,
  createProduct,
  updateById,
  deleteById,
};
