const productService = require('./product.service');
const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');

const getProducts = asyncHandler(async (req, res) => {
  const result = await productService.listProducts(req.query);
  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Products fetched successfully'));
});

const getProductById = asyncHandler(async (req, res) => {
  const product = await productService.getProductById(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, product, 'Product fetched successfully'));
});

const searchProducts = asyncHandler(async (req, res) => {
  const result = await productService.searchProducts(req.query.q || '');
  return res
    .status(200)
    .json(new ApiResponse(200, result, 'Search completed successfully'));
});

const createProduct = asyncHandler(async (req, res) => {
  const created = await productService.createProduct(req.body);
  return res
    .status(201)
    .json(new ApiResponse(201, created, 'Product created successfully'));
});

const updateProduct = asyncHandler(async (req, res) => {
  const updated = await productService.updateProduct(req.params.id, req.body);
  return res
    .status(200)
    .json(new ApiResponse(200, updated, 'Product updated successfully'));
});

const deleteProduct = asyncHandler(async (req, res) => {
  await productService.deleteProduct(req.params.id);
  return res
    .status(200)
    .json(new ApiResponse(200, null, 'Product deleted successfully'));
});

module.exports = {
  getProducts,
  getProductById,
  searchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
