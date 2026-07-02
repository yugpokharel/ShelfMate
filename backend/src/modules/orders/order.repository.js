const Order = require('./order.model');

const createOrder = async (payload) => Order.create(payload);

const findByUser = async (userId) =>
  Order.find({ user: userId }).sort({ createdAt: -1 }).populate('items.product');

const findById = async (id) => Order.findById(id).populate('items.product');

const updateStatus = async (id, status) =>
  Order.findByIdAndUpdate(id, { status }, { new: true, runValidators: true });

module.exports = {
  createOrder,
  findByUser,
  findById,
  updateStatus,
};
