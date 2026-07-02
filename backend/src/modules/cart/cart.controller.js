const cartService = require('./cart.service');
const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');

const getCart = asyncHandler(async (req, res) => {
  const cart = await cartService.getCart(req.user.id);
  return res.status(200).json(new ApiResponse(200, cart, 'Cart fetched successfully'));
});

const addItem = asyncHandler(async (req, res) => {
  const cart = await cartService.addToCart(req.user.id, req.body);
  return res.status(200).json(new ApiResponse(200, cart, 'Item added to cart'));
});

const updateItem = asyncHandler(async (req, res) => {
  const cart = await cartService.updateQty(req.user.id, req.params.id, req.body.quantity);
  return res.status(200).json(new ApiResponse(200, cart, 'Cart item updated'));
});

const removeItem = asyncHandler(async (req, res) => {
  const cart = await cartService.removeFromCart(req.user.id, req.params.id);
  return res.status(200).json(new ApiResponse(200, cart, 'Cart item removed'));
});

const clearCart = asyncHandler(async (req, res) => {
  const cart = await cartService.clearCart(req.user.id);
  return res.status(200).json(new ApiResponse(200, cart, 'Cart cleared'));
});

module.exports = {
  getCart,
  addItem,
  updateItem,
  removeItem,
  clearCart,
};
