const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const { default: mongoose } = require('mongoose');
const app = require('./app');

// console.log(process.env);

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD,
);

mongoose.connect(DB).then(() => console.log('DB connection successful'));

const PORT = process.env.PORT || 4000;
// const HOST = `127.0.0.1`;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
