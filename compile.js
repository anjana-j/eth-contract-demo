const path = require('path');
const fs = require('fs');

// calling solc
const solc = require('solc');

// set the path
const inboxPath = path.resolve(__dirname,'contracts','Inbox.sol');

// read the contents of the .sol file
const source = fs.readFileSync(inboxPath,'utf8');

// give how many contracts going to compile
// solc.compile(source, 1);


module.exports = solc.compile(source, 1).contracts[':Inbox'];