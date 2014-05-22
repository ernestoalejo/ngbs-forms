'use strict';


function RadiosValidators(field) {
  this.field = field;
}


RadiosValidators.prototype.custom = function(condition, message) {
  this.field.validators_.push(function() {
    return {
      customError: '(' + condition + ')',
      message: message,
    };
  });
};


RadiosValidators.prototype.customValidator = function(error, message) {
  this.field.validators_.push(function() {
    return {
      error: error,
      message: message,
    };
  });
};


module.exports = RadiosValidators;
