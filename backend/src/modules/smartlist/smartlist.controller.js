const smartListService = require('./smartlist.service');
const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');

const getSmartList = asyncHandler(async (req, res) => {
  const list = await smartListService.getSmartList(req.user.id);
  return res.status(200).json(new ApiResponse(200, list, 'Smart list fetched successfully'));
});

const addToCart = asyncHandler(async (req, res) => {
  const result = await smartListService.addToCartFromSmartList(req.user.id);
  return res.status(200).json(new ApiResponse(200, result, 'Smart list added to cart'));
});

module.exports = {
  getSmartList,
  addToCart,
};
