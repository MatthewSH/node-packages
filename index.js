// Coding standard for this project defined @ https://github.com/MatthewSH/standards/blob/master/JavaScript.md
'use strict';

const $request  = require('request');
const $load     = require('cheerio').load;

exports = module.exports = get;
exports.get = get;
exports.post = function (_options, _selectors, _callback) {
  scrapeURL('post', _options, _selectors, _callback);
}

function get (_options, _selectors, _callback) {
  if(typeof _options === 'string') {
    _options = { url: _options };
  }

  scrapeURL('get', _options, _selectors, _callback);
}

function scrapeURL (_method, _options, _selectors, _callback) {
  !/\w:\/\//.test(_options.url) && (_options.url = 'http://' + _options.url);
  $request[_method](_options, function (error, response, body) {
    if (error) {
      return _callback(error);
    }
    if(response.statusCode != 200) {
      return _callback(new Error('The webpage did not responsd.'));
    }
    if(typeof _selectors === 'string') {
      _selectors = [_selectors];
    }

    var body    = $load(body);
    var result  = [undefined].concat(_selectors.map(function (selector) {
      var elements = [];
      var selected = body(selector);
      selected.each(function () {
        elements.push(body(this));
      });
      return elements;
    }));
    _callback.apply(null, result);
  });
}
