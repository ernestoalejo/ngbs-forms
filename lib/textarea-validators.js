'use strict';


function TextareaValidators(field) {
  this.field = field;
}


TextareaValidators.prototype.custom = function(condition, message) {
  this.field.validators_.push(function() {
    return {
      customError: '(' + condition + ')',
      message: message,
    };
  });
};


TextareaValidators.prototype.maxlength = function(maxlen, message) {
  this.field.attrs_['ng-maxlength'] = maxlen;

  this.field.validators_.push(function() {
    return {
      error: 'maxlength',
      message: message,
    };
  });
};


TextareaValidators.prototype.minlength = function(minlen, message) {
  this.field.attrs_['ng-minlength'] = minlen;

  this.field.validators_.push(function() {
    return {
      error: 'minlength',
      message: message,
    };
  });
};


TextareaValidators.prototype.regexp = function(pattern, message) {
  this.field.attrs_['ng-pattern'] = pattern;

  this.field.validators_.push(function() {
    return {
      error: 'pattern',
      message: message,
    };
  });
};


TextareaValidators.prototype.required = function(message) {
  this.field.attrs_.required = '';

  this.field.validators_.push(function() {
    return {
      error: 'required',
      message: message,
    };
  });
};


module.exports = TextareaValidators;
