// Coding standard for this project defined @ https://github.com/MatthewSH/standards/blob/master/JavaScript.md
const $escape     = require('escape-regexp-component');
const $capital    = require('to-capital-case');
const $minors     = require('title-case-minors');
var escaped       = $minors.map($escape);
var minorMatcher  = new RegExp('[^^]\\b(' + escaped.join('|') + ')\\b', 'ig');
var colonMatcher  = /:\s*(\w)/g;

exports = module.exports = function (_string) {
  return $capital(_string).replace(minorMatcher, function (minor) {
      return minor.toLowerCase();
    }).replace(colonMatcher, function (letter) {
      return letter.toUpperCase();
    });
};
