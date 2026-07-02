const productRepository = require('./product.repository');
const ApiError = require('../../utils/ApiError');

const listProducts = async (query) => {
  const page = Math.max(Number(query.page) || 1, 1);
  const limit = Math.min(Math.max(Number(query.limit) || 20, 1), 100);
  const skip = (page - 1) * limit;

  const dietaryTags = query.dietaryTags
    ? String(query.dietaryTags)
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  const filter = productRepository.buildFilter({
    category: query.category,
    dietaryTags,
    minPrice: query.minPrice,
    maxPrice: query.maxPrice,
    search: query.search,
    isActive: query.includeInactive === 'true' ? undefined : true,
  });

  const [items, total] = await Promise.all([
    productRepository.findAll({ filter, skip, limit }),
    productRepository.count(filter),
  ]);

  return {
    items,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
    },
  };
};

const getProductById = async (id) => {
  const product = await productRepository.findById(id);
  if (!product) throw new ApiError(404, 'Product not found');
  return product;
};

const searchProducts = async (q) => listProducts({ search: q });

const getProductsByCategory = async (categoryId) => listProducts({ category: categoryId });

module.exports = {
  listProducts,
  getProductById,
  searchProducts,
  getProductsByCategory,
};
