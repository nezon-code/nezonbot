const express = require('express');
const server = express();
const config = require('./config.json');

server.all('/', (req, res) => {
  res.send(`i am existant`);
});

function keepAlive() {
  server.listen(3000, () => {console.log(`what`)});
};

module.exports = keepAlive;