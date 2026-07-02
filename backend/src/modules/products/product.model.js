const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    images: { type: [String], default: [] },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
      index: true,
    },
    tags: { type: [String], default: [] },
    dietaryTags: { type: [String], default: [] },
    weight: { type: Number, min: 0, default: 0 },
    unit: { type: String, default: 'unit' },
    stock: { type: Number, min: 0, default: 0 },
    isActive: { type: Boolean, default: true, index: true },
    ratings: {
      average: { type: Number, default: 0, min: 0, max: 5 },
      count: { type: Number, default: 0, min: 0 },
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        delete ret.__v;
        return ret;
      },
    },
  }
);

productSchema.index({ name: 'text', description: 'text', tags: 'text' });
productSchema.index({ slug: 1, category: 1, price: 1, createdAt: -1 });

module.exports = mongoose.model('Product', productSchema);
