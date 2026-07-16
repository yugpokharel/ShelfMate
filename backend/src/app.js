const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const compression = require('compression');
const env = require('./config/env');
const ApiError = require('./utils/ApiError');
const errorMiddleware = require('./middleware/error.middleware');
const apiRateLimiter = require('./middleware/rateLimiter.middleware');

const authRoutes = require('./modules/auth/auth.routes');
const userRoutes = require('./modules/users/user.routes');
const categoryRoutes = require('./modules/categories/category.routes');
const productRoutes = require('./modules/products/product.routes');
const cartRoutes = require('./modules/cart/cart.routes');
const orderRoutes = require('./modules/orders/order.routes');
const smartListRoutes = require('./modules/smartlist/smartlist.routes');

const app = express();

app.use(helmet());
const allowedOrigins = env.corsOrigin.split(',').map((o) => o.trim())
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true)
      } else {
        callback(new Error(`CORS blocked: ${origin}`))
      }
    },
    credentials: true,
  })
);
app.use(morgan(env.nodeEnv === 'production' ? 'combined' : 'dev'));
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiRateLimiter);

app.get('/health', (_req, res) => {
  res.status(200).json({ status: 'ok', service: 'shelfmate-backend' });
});

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/cart', cartRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/smartlist', smartListRoutes);

app.use((_req, _res, next) => {
  next(new ApiError(404, 'Route not found'));
});

app.use(errorMiddleware);

module.exports = app;
