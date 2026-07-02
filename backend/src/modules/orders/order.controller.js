const orderService = require('./order.service');
const ApiResponse = require('../../utils/ApiResponse');
const asyncHandler = require('../../utils/asyncHandler');

const placeOrder = asyncHandler(async (req, res) => {
  const order = await orderService.placeOrder(req.user.id, req.body);
  return res.status(201).json(new ApiResponse(201, order, 'Order placed successfully'));
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getOrderHistory(req.user.id);
  return res.status(200).json(new ApiResponse(200, orders, 'Orders fetched successfully'));
});

const getOrderById = asyncHandler(async (req, res) => {
  const order = await orderService.getOrderById(req.user.id, req.params.id);
  return res.status(200).json(new ApiResponse(200, order, 'Order fetched successfully'));
});

const cancelOrder = asyncHandler(async (req, res) => {
  const order = await orderService.cancelOrder(req.user.id, req.params.id);
  return res.status(200).json(new ApiResponse(200, order, 'Order cancelled successfully'));
});

module.exports = {
  placeOrder,
  getOrders,
  getOrderById,
  cancelOrder,
};
