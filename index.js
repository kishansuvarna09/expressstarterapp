const express = require('express');
const dotenv = require('dotenv');

const app = express();

const env = dotenv.config({ path: './.env.dev' });
console.log(env);
const PORT = env.PORT || 3000;
const DOMAIN = env.DOMAIN || 'http://localhost';

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`App listening at ${DOMAIN}:${PORT}`);
});
