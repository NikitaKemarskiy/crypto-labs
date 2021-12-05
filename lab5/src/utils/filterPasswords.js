const fs = require('fs');
const lowercaseRegex = new RegExp("[a-z]");
const uppercaseRegex = new RegExp("[A-Z]");
const numberRegex = new RegExp("\\d");
const specialCharacterRegex = new RegExp("[^a-zA-Z\\d]");

const data = fs.readFileSync('src/data/10-million-password-list-top-1000000.txt', 'utf8');

const arr = data.toString()
	.split(new RegExp("\\n"))
	.filter(str => str.length >= 8)
	.filter(str => lowercaseRegex.test(str))
	.filter(str => uppercaseRegex.test(str))
	.filter(str => numberRegex.test(str))
	.filter(str => specialCharacterRegex.test(str));

fs.writeFileSync("src/data/mostCommonPasswords.txt", arr.join("\n"));
