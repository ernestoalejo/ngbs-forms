'use strict';

var _ = require('underscore'),
    path = require('path'),
    Form = require('./form');


module.exports = function(filepath) {
  var generator = require(path.resolve(filepath));
  if (!_.isFunction(generator)) {
    throw new Error('the form module should export a function: ' + filepath);
  }

  var form = new Form();
  generator(form);
  return form.build();
};
