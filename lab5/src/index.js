const express = require('express');
const app = express();

const PORT = 8080;

async function main() {
  await app.listen(PORT);

  console.log(`Server is listening at ${PORT}`);
}

main();
