const Cart = require('./cart.model');

const getCartByUser = async (userId) =>
  Cart.findOne({ user: userId }).populate('items.product');

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  return cart;
};

const addItem = async (userId, item) => {
  const cart = await getOrCreateCart(userId);
  const existing = cart.items.find((cartItem) => cartItem.product.toString() === item.product.toString());

  if (existing) {
    existing.quantity += item.quantity;
    existing.price = item.price;
  } else {
    cart.items.push(item);
  }

  await cart.save();
  return getCartByUser(userId);
};

const updateItemQty = async (userId, itemId, quantity) => {
  const cart = await getOrCreateCart(userId);
  const item = cart.items.id(itemId);
  if (!item) return null;

  item.quantity = quantity;
  await cart.save();
  return getCartByUser(userId);
};

const removeItem = async (userId, itemId) => {
  const cart = await getOrCreateCart(userId);
  cart.items = cart.items.filter((item) => item._id.toString() !== itemId.toString());
  await cart.save();
  return getCartByUser(userId);
};

const clearCart = async (userId) => {
  const cart = await getOrCreateCart(userId);
  cart.items = [];
  await cart.save();
  return cart;
};

module.exports = {
  getCartByUser,
  addItem,
  updateItemQty,
  removeItem,
  clearCart,
};
