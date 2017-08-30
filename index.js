// Coding standard for this project defined @ https://github.com/MatthewSH/standards/blob/master/JavaScript.md
'use strict';

const $read = require('fs').readFileSync;

exports = module.exports = function envApply (file) {
  if (typeof file !== 'string') {
    envApply('./.env');
  }

  var document;
  try {
    document = $read(file).toString().split('\n');
  } catch (exception) {
    throw new Error('The .env file could not be found or read correctly. Are you sure it is in the root directory?');
  }

  var i = -1;
  var row;

  while(++i < document.length) {
    if (!document[i]) {
      continue;
    }
    row = document[i].split(/\s*=\s*/);
    process.env[row.shift()] = row.join('=').replace(/['"]/g, '');
  }

}
