'use strict';


module.exports = {

  required: function() {
    return {
      types: ['input', 'textarea', 'select'],
      attrs: {required: ''},
      error: 'required',
    };
  },

  minlength: function(args) {
    if (args.length != 1 || !parseInt(args[0], 10)) {
      throw new Error('minlength validation needs an integer as the first arg');
    }
    
    return {
      types: ['input', 'textarea'],
      attrs: {'ng-minlength': args[0]},
      error: 'minlength',
    };
  },

  maxlength: function(args) {
    if (args.length != 1 || !parseInt(args[0], 10)) {
      throw new Error('maxlength validation needs an integer as the first arg');
    }
    
    return {
      types: ['input', 'textarea'],
      attrs: {'ng-maxlength': args[0]},
      error: 'maxlength',
    };
  },

  pattern: function(args) {
    if (args.length != 1) {
      throw new Error('pattern validation needs a regexp as the first arg');
    }
    
    return {
      types: ['input', 'textarea'],
      attrs: {'ng-pattern': args[0]},
      error: 'pattern',
    };
  },

  custom: function(args) {
    if (args.length != 1) {
      throw new Error('custom validation needs an expression as the first arg');
    }
    
    return {
      types: ['input', 'select', 'textarea'],
      attrs: {},
      customError: args[0],
    };
  },

  integer: function() {
    return {
      types: ['input'],
      attrs: {},
      error: 'number',
    };
  },

  positive: function() {
    return {
      types: ['input'],
      attrs: {min: '0'},
      error: 'min',
    };
  },

  minvalue: function(args) {
    if (args.length != 1 || !parseInt(args[0], 10)) {
      throw new Error('minvalue validation needs an integer as the first arg');
    }
    
    return {
      types: ['input'],
      attrs: {min: args[0]},
      error: 'min',
    };
  },

  maxvalue: function(args) {
    if (args.length != 1 || !parseInt(args[0], 10)) {
      throw new Error('maxvalue validation needs an integer as the first arg');
    }
    
    return {
      types: ['input'],
      attrs: {max: args[0]},
      error: 'max',
    };
  },

  mindate: function(args) {
    if (args.length != 1) {
      throw new Error('mindate validation needs an expr as the first arg');
    }
    
    return {
      types: ['input'],
      attrs: {
        min: args[0],
        'min-date-value': args[0],
      },
      error: 'min',
    };
  },

  maxdate: function(args) {
    if (args.length != 1) {
      throw new Error('maxdate validation needs an expr as the first arg');
    }
    
    return {
      types: ['input'],
      attrs: {
        max: args[0],
        'max-date-value': args[0],
      },
      error: 'max',
    };
  },

  date: function() {
    return {
      types: ['input'],
      attrs: {},
      error: 'date',
    };
  },

  email: function() {
    return {
      types: ['input'],
      attrs: {},
      error: 'email',
    };
  },

  url: function() {
    return {
      types: ['input'],
      attrs: {},
      error: 'url',
    };
  },

  match: function(args) {
    if (args.length != 1) {
      throw new Error('match validation needs the other field as the first arg');
    }
    
    return {
      types: ['input'],
      attrs: {
        match: args[0],
      },
      error: 'match',
    };
  },

};

