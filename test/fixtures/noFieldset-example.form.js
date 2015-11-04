'use strict';


module.exports = function(form) {
  form.noFieldset(true);
  form.nameOnly('f3');

  form.input('foo');
};
