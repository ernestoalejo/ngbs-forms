'use strict';


function SelectValidators(field) {
  this.field = field;
}


SelectValidators.prototype.custom = function(condition, message) {
  this.field.validators_.push(function() {
    return {
      customError: '(' + condition + ')',
      message: message,
    };
  });
};


SelectValidators.prototype.required = function(message) {
  this.field.attrs_.required = '';

  this.field.validators_.push(function() {
    return {
      error: 'required',
      message: message,
    };
  });
};


module.exports = SelectValidators;
