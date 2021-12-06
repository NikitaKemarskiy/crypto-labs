const path = require('path');
const fs = require('fs/promises');

const passwordUtil = {
  commonPasswords: null,
  getCommonPasswords: async function () {
    if (!this.commonPasswords) {
      this.commonPasswords =
        (await fs.readFile(
          path.join(__dirname, '..', '..', 'data', 'mostCommonPasswords.txt'),
          { encoding: 'utf-8' }
        )).split('\n');
    }

    return this.commonPasswords;
  },
}

module.exports = passwordUtil;
