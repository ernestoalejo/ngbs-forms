'use strict';


function InputValidators(field) {
  this.field = field;
}


InputValidators.prototype.custom = function(condition, message) {
  this.field.validators_.push(function() {
    return {
      customError: '(' + condition + ')',
      message: message,
    };
  });
};


InputValidators.prototype.date = function(message) {
  this.field.validators_.push(function() {
    return {
      error: 'date',
      message: message,
    };
  });
};


InputValidators.prototype.email = function(message) {
  if (this.field.type_ !== 'email') {
    throw new Error('email validator needs an input with type "email"');
  }

  this.field.validators_.push(function() {
    return {
      error: 'email',
      message: message,
    };
  });
};


InputValidators.prototype.integer = function(message) {
  if (this.field.type_ !== 'number') {
    throw new Error('integer validator needs an input with type "number"');
  }

  this.field.validators_.push(function() {
    return {
      error: 'number',
      message: message,
    };
  });
};


InputValidators.prototype.match = function(otherField, message) {
  this.field.attrs_.match = otherField;

  this.field.validators_.push(function() {
    return {
      error: 'match',
      message: message,
    };
  });
};


InputValidators.prototype.maxdate = function(maxdate, message) {
  this.field.attrs_['max-date-value'] = maxdate;

  this.field.validators_.push(function() {
    return {
      error: 'max',
      message: message,
    };
  });
};


InputValidators.prototype.maxlength = function(maxlen, message) {
  this.field.attrs_['ng-maxlength'] = maxlen;

  this.field.validators_.push(function() {
    return {
      error: 'maxlength',
      message: message,
    };
  });
};


InputValidators.prototype.maxvalue = function(maxvalue, message) {
  if (this.field.type_ !== 'number') {
    throw new Error('maxvalue validator needs an input with type "number"');
  }

  this.field.attrs_.max = maxvalue;

  this.field.validators_.push(function() {
    return {
      error: 'max',
      message: message,
    };
  });
};


InputValidators.prototype.mindate = function(mindate, message) {
  this.field.attrs_['min-date-value'] = mindate;

  this.field.validators_.push(function() {
    return {
      error: 'min',
      message: message,
    };
  });
};


InputValidators.prototype.minlength = function(minlen, message) {
  this.field.attrs_['ng-minlength'] = minlen;

  this.field.validators_.push(function() {
    return {
      error: 'minlength',
      message: message,
    };
  });
};


InputValidators.prototype.minvalue = function(minvalue, message) {
  if (this.field.type_ !== 'number') {
    throw new Error('minvalue validator needs an input with type "number"');
  }

  this.field.attrs_.min = minvalue;

  this.field.validators_.push(function() {
    return {
      error: 'min',
      message: message,
    };
  });
};


InputValidators.prototype.positive = function(message) {
  if (this.field.type_ !== 'number') {
    throw new Error('positive validator needs an input with type "number"');
  }

  this.field.attrs_.min = 0;

  this.field.validators_.push(function() {
    return {
      error: 'min',
      message: message,
    };
  });
};


InputValidators.prototype.regexp = function(pattern, message) {
  this.field.attrs_['ng-pattern'] = pattern;

  this.field.validators_.push(function() {
    return {
      error: 'pattern',
      message: message,
    };
  });
};


InputValidators.prototype.required = function(message) {
  this.field.attrs_.required = '';

  this.field.validators_.push(function() {
    return {
      error: 'required',
      message: message,
    };
  });
};


InputValidators.prototype.url = function(message) {
  if (this.field.type_ !== 'url') {
    throw new Error('url validator needs an input with type "url"');
  }

  this.field.validators_.push(function() {
    return {
      error: 'url',
      message: message,
    };
  });
};


module.exports = InputValidators;
