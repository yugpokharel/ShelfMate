require('dotenv').config();
const mongoose = require('mongoose');
const Category = require('../modules/categories/category.model');
const Product = require('../modules/products/product.model');

const categorySeeds = [
  { name: 'Fruits', slug: 'fruits', icon: 'apple', description: 'Fresh fruits' },
  { name: 'Vegetables', slug: 'vegetables', icon: 'carrot', description: 'Farm vegetables' },
  { name: 'Dairy', slug: 'dairy', icon: 'milk', description: 'Milk and cheese' },
  { name: 'Bakery', slug: 'bakery', icon: 'bread', description: 'Breads and pastries' },
  { name: 'Meat', slug: 'meat', icon: 'meat', description: 'Meat products' },
  { name: 'Seafood', slug: 'seafood', icon: 'fish', description: 'Seafood choices' },
  { name: 'Pantry', slug: 'pantry', icon: 'jar', description: 'Dry pantry goods' },
  { name: 'Beverages', slug: 'beverages', icon: 'cup', description: 'Drinks and juices' },
];

const productSeeds = (categories) => {
  const ids = Object.fromEntries(categories.map((c) => [c.slug, c._id]));
  return [
    ['Organic Bananas', 'organic-bananas', 2.99, 'fruits', ['vegan'], 12],
    ['Red Apples', 'red-apples', 3.49, 'fruits', ['vegan'], 20],
    ['Baby Spinach', 'baby-spinach', 2.5, 'vegetables', ['vegan'], 15],
    ['Broccoli Crown', 'broccoli-crown', 1.99, 'vegetables', ['vegan'], 18],
    ['Whole Milk', 'whole-milk', 4.29, 'dairy', ['vegetarian'], 10],
    ['Greek Yogurt', 'greek-yogurt', 5.49, 'dairy', ['vegetarian'], 11],
    ['Sourdough Loaf', 'sourdough-loaf', 4.99, 'bakery', ['vegetarian'], 8],
    ['Whole Wheat Bread', 'whole-wheat-bread', 3.99, 'bakery', ['vegan'], 9],
    ['Chicken Breast', 'chicken-breast', 8.99, 'meat', ['high-protein'], 13],
    ['Ground Beef', 'ground-beef', 9.49, 'meat', ['high-protein'], 7],
    ['Atlantic Salmon', 'atlantic-salmon', 12.99, 'seafood', ['high-protein'], 6],
    ['Shrimp Pack', 'shrimp-pack', 10.49, 'seafood', ['high-protein'], 6],
    ['Brown Rice', 'brown-rice', 4.19, 'pantry', ['vegan', 'gluten-free'], 21],
    ['Olive Oil', 'olive-oil', 9.99, 'pantry', ['vegan'], 14],
    ['Black Beans', 'black-beans', 2.29, 'pantry', ['vegan'], 22],
    ['Oat Milk', 'oat-milk', 3.89, 'beverages', ['vegan'], 16],
    ['Orange Juice', 'orange-juice', 4.59, 'beverages', ['vegan'], 12],
    ['Sparkling Water', 'sparkling-water', 1.5, 'beverages', ['vegan'], 30],
    ['Cheddar Cheese', 'cheddar-cheese', 6.25, 'dairy', ['vegetarian'], 10],
    ['Avocado', 'avocado', 1.99, 'fruits', ['vegan'], 25],
  ].map(([name, slug, price, categorySlug, dietaryTags, stock]) => ({
    name,
    slug,
    description: `${name} for your weekly grocery needs`,
    price,
    images: [],
    category: ids[categorySlug],
    tags: [categorySlug],
    dietaryTags,
    weight: 1,
    unit: 'unit',
    stock,
    isActive: true,
  }));
};

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);

  await Promise.all([Category.deleteMany({}), Product.deleteMany({})]);

  const categories = await Category.insertMany(categorySeeds);
  const products = productSeeds(categories);
  await Product.insertMany(products);

  console.log(`Seed complete: ${categories.length} categories, ${products.length} products`);
  await mongoose.disconnect();
};

run().catch(async (err) => {
  console.error('Seed failed', err);
  await mongoose.disconnect();
  process.exit(1);
});
