const orderRepository = require('./order.repository');
const cartRepository = require('../cart/cart.repository');
const Product = require('../products/product.model');
const ApiError = require('../../utils/ApiError');

const placeOrder = async (userId, payload) => {
  const cart = await cartRepository.getCartByUser(userId);
  if (!cart || cart.items.length === 0) {
    throw new ApiError(400, 'Cart is empty');
  }

  const items = [];
  let subtotal = 0;

  for (const cartItem of cart.items) {
    const product = await Product.findById(cartItem.product);
    if (!product || !product.isActive) {
      throw new ApiError(400, 'One or more cart items are unavailable');
    }
    if (product.stock < cartItem.quantity) {
      throw new ApiError(400, `Insufficient stock for ${product.name}`);
    }

    product.stock -= cartItem.quantity;
    await product.save();

    const lineTotal = cartItem.quantity * cartItem.price;
    subtotal += lineTotal;

    items.push({
      product: product._id,
      name: product.name,
      price: cartItem.price,
      quantity: cartItem.quantity,
    });
  }

  const deliveryFee = payload.deliveryFee ?? 4.99;
  const total = subtotal + deliveryFee;

  const order = await orderRepository.createOrder({
    user: userId,
    items,
    subtotal,
    deliveryFee,
    total,
    address: payload.address,
    deliverySlot: payload.deliverySlot,
    paymentMethod: payload.paymentMethod,
  });

  await cartRepository.clearCart(userId);

  return order;
};

const cancelOrder = async (userId, orderId) => {
  const order = await orderRepository.findById(orderId);
  if (!order || order.user.toString() !== userId.toString()) {
    throw new ApiError(404, 'Order not found');
  }

  if (['delivered', 'cancelled'].includes(order.status)) {
    throw new ApiError(400, 'Order cannot be cancelled');
  }

  return orderRepository.updateStatus(orderId, 'cancelled');
};

const getOrderHistory = async (userId) => orderRepository.findByUser(userId);

const getOrderById = async (userId, orderId) => {
  const order = await orderRepository.findById(orderId);
  if (!order || order.user.toString() !== userId.toString()) {
    throw new ApiError(404, 'Order not found');
  }
  return order;
};

module.exports = {
  placeOrder,
  cancelOrder,
  getOrderHistory,
  getOrderById,
};
