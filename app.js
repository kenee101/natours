const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res
    .status(200)
    .json({ message: 'Hello from the server side', app: 'Natours' });
});

app.post('/', (req, res) => {
  res.send(`You can post to this endpoint...`);
});

const PORT = 4000;
// const HOST = `127.0.0.1`;

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}...`);
});
