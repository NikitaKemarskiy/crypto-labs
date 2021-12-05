const express = require('express');
const router = require('./router');

const PORT = 8080;

const app = express();

app.use(router);

async function main() {
  await app.listen(PORT);

  console.log(`Server is listening at ${PORT}`);
}

main();
