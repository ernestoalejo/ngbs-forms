'use strict';


function CheckboxValidators(field) {
  this.field = field;
}


CheckboxValidators.prototype.custom = function(condition, message) {
  this.field.validators_.push(function() {
    return {
      customError: '(' + condition + ')',
      message: message,
    };
  });
};


CheckboxValidators.prototype.customValidator = function(error, message) {
  this.field.validators_.push(function() {
    return {
      error: error,
      message: message,
    };
  });
};


module.exports = CheckboxValidators;
