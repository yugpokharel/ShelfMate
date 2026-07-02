const cartRepository = require('./cart.repository');
const Product = require('../products/product.model');
const ApiError = require('../../utils/ApiError');

const calculateTotals = (cart) => {
  const subtotal = cart.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  return {
    ...cart.toJSON(),
    totals: {
      subtotal,
      itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
    },
  };
};

const addToCart = async (userId, { productId, quantity = 1 }) => {
  const product = await Product.findById(productId);
  if (!product || !product.isActive) throw new ApiError(404, 'Product not found');
  if (product.stock < quantity) throw new ApiError(400, 'Insufficient stock');

  const cart = await cartRepository.addItem(userId, {
    product: product._id,
    quantity,
    price: product.price,
  });

  return calculateTotals(cart);
};

const updateQty = async (userId, itemId, quantity) => {
  if (quantity < 1) throw new ApiError(400, 'Quantity must be at least 1');

  const cart = await cartRepository.updateItemQty(userId, itemId, quantity);
  if (!cart) throw new ApiError(404, 'Cart item not found');

  return calculateTotals(cart);
};

const removeFromCart = async (userId, itemId) => {
  const cart = await cartRepository.removeItem(userId, itemId);
  return calculateTotals(cart);
};

const getCart = async (userId) => {
  const cart = await cartRepository.getCartByUser(userId);
  if (!cart) return { items: [], totals: { subtotal: 0, itemCount: 0 } };
  return calculateTotals(cart);
};

const clearCart = async (userId) => {
  const cart = await cartRepository.clearCart(userId);
  return calculateTotals(cart);
};

module.exports = {
  addToCart,
  updateQty,
  removeFromCart,
  getCart,
  clearCart,
};
