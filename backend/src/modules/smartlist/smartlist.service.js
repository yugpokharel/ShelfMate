const smartListRepository = require('./smartlist.repository');
const orderRepository = require('../orders/order.repository');
const cartRepository = require('../cart/cart.repository');
const ApiError = require('../../utils/ApiError');

const generateFromOrders = async (userId) => {
  const orders = await orderRepository.findByUser(userId);
  const recentOrders = orders.slice(0, 3);

  const frequency = new Map();
  for (const order of recentOrders) {
    for (const item of order.items) {
      const key = item.product.toString();
      const existing = frequency.get(key) || { product: item.product, name: item.name, qty: 0 };
      existing.qty += item.quantity;
      frequency.set(key, existing);
    }
  }

  const items = Array.from(frequency.values()).map((entry) => ({
    product: entry.product,
    name: entry.name,
    suggestedQty: Math.max(1, Math.round(entry.qty / Math.max(recentOrders.length, 1))),
  }));

  return smartListRepository.upsertByUser(userId, items, new Date());
};

const getSmartList = async (userId) => {
  let list = await smartListRepository.getByUser(userId);
  if (!list) {
    list = await generateFromOrders(userId);
  }
  return list;
};

const addToCartFromSmartList = async (userId) => {
  const list = await smartListRepository.getByUser(userId);
  if (!list || list.items.length === 0) {
    throw new ApiError(400, 'Smart list is empty');
  }

  for (const item of list.items) {
    await cartRepository.addItem(userId, {
      product: item.product,
      quantity: item.suggestedQty,
      price: item.product?.price || 0,
    });
  }

  return { moved: list.items.length };
};

module.exports = {
  generateFromOrders,
  getSmartList,
  addToCartFromSmartList,
};
