const SmartList = require('./smartlist.model');

const getByUser = async (userId) => SmartList.findOne({ user: userId }).populate('items.product');

const upsertByUser = async (userId, items, lastGenerated = new Date()) =>
  SmartList.findOneAndUpdate(
    { user: userId },
    { items, lastGenerated },
    { new: true, upsert: true, runValidators: true }
  );

module.exports = {
  getByUser,
  upsertByUser,
};
