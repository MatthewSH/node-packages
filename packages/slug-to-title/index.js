// Coding standard for this project defined @ https://github.com/MatthewSH/standards/blob/master/JavaScript.md
const $title  = require('to-title');
const $trim   = require('trim');

exports = module.exports = function (_slug) {
  return $trim($title(_slug.replace(/[-_]+/g, ' ').replace(/([\.,;])/g, '$1 ')));
};
