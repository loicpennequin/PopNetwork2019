const path = require('path');
const resources = ['_all.sass'];
module.exports = resources.map(file => path.resolve(__dirname, file));
