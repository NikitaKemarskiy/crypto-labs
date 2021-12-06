const fs = require('fs/promises');

const passwordUtil = {
  commonPasswords: null,
  getCommonPasswords: async function () {
    if (!this.commonPasswords) {
      this.commonPasswords =
        (await fs.readFile('../../data/mostCommonPasswords.txt', { encoding: 'utf-8' })).split('\n');
    }

    return this.commonPasswords;
  },
}

module.exports = passwordUtil;
