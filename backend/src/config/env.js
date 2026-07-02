const dotenv = require('dotenv');
const Joi = require('joi');

dotenv.config({ path: './backend/.env' });

const envSchema = Joi.object({
  PORT: Joi.number().default(5000),
  MONGODB_URI: Joi.string().required(),
  JWT_ACCESS_SECRET: Joi.string().required(),
  JWT_REFRESH_SECRET: Joi.string().required(),
  JWT_ACCESS_EXPIRY: Joi.string().default('15m'),
  JWT_REFRESH_EXPIRY: Joi.string().default('7d'),
  NODE_ENV: Joi.string().valid('development', 'test', 'production').default('development'),
  CORS_ORIGIN: Joi.string().default('http://localhost:3000'),
}).unknown();

const { value, error } = envSchema.validate(process.env, { abortEarly: false });

if (error) {
  throw new Error(`Environment validation failed: ${error.message}`);
}

const env = {
  port: value.PORT,
  mongoUri: value.MONGODB_URI,
  jwtAccessSecret: value.JWT_ACCESS_SECRET,
  jwtRefreshSecret: value.JWT_REFRESH_SECRET,
  jwtAccessExpiry: value.JWT_ACCESS_EXPIRY,
  jwtRefreshExpiry: value.JWT_REFRESH_EXPIRY,
  nodeEnv: value.NODE_ENV,
  corsOrigin: value.CORS_ORIGIN,
};

module.exports = env;
