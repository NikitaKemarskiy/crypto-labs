const express = require('express');
const router = require('./router');
const { loadPasswords } = require('./utils/commonPasswordsUtil.js');

const PORT = 3000;

const app = express();

app.use(express.urlencoded());
app.use(router);

async function main() {
  await loadPasswords();
  await app.listen(PORT);

  console.log(`Server is listening at ${PORT}`);
}

main();
