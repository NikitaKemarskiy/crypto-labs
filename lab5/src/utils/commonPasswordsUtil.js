const fs = require('fs');

const commonPasswordsUtil = {
    passwords: [],
    loadPasswords: () => {
        fs.readFile('src/data/mostCommonPasswords.txt', 'utf8', (err, data) => {
            if (err) {
                console.error(err);
            } else {
                commonPasswordsUtil.passwords = data.toString().split(new RegExp("\\n"));
            }
        });
    }
}

module.exports = commonPasswordsUtil;