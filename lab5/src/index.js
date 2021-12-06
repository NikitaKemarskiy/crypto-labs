const express = require('express');
const router = require('./router');

const PORT = 3000;

const app = express();

app.use(express.urlencoded());
app.use(router);

async function main() {
  await app.listen(PORT);

  console.log(`Server is listening at ${PORT}`);
}

main();
