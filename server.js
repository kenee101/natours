const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app');

// console.log(process.env);

const PORT = process.env.PORT || 4000;
// const HOST = `127.0.0.1`;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
