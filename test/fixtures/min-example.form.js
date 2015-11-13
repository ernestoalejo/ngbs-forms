'use strict';


module.exports = function(form) {
  form.nameOnly('f0');
  form.submitOnForm(true);

  form.input('foo');
};
