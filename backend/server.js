const app = require('./src/app');
const env = require('./src/config/env');
const connectWithRetry = require('./src/config/db');

connectWithRetry();

app.listen(env.port, () => {
  console.log(`Server is running on port ${env.port}`);
});
