'use strict';

var validators = require('./validators'),
    _ = require('underscore'),
    path = require('path'),
    fs = require('fs'),
    _s = require('underscore.string');

var formId = 0;

var Generator = function(id) {
  this.id = id;

  this.blocks = [];
  this.indent = 0;
};

/**
 * Output a new block indenting it as needed.
 * @param {string} block The new block.
 */
Generator.prototype.outputBlock = function(block) {
  var prefix = _s.repeat('  ', this.indent);
  var lines = block.split('\n');
  _.forEach(lines, function(line, idx) {
    if (line.length > 0) {
      lines[idx] = prefix + line;
    }
  });
  this.blocks.push(lines.join('\n'));
};

/**
 * Output a new block based on a template.
 * @param {string} filename The template name.
 * @param {Object} data The template data
 * @param {boolean} noOutput Don't output generated code directly.
 * @return {string} The generated code.
 */
Generator.prototype.template = function(filename, data, noOutput) {
  data = data || {};
  var p = path.join(__dirname, 'templates', filename + '.tpl');
  var contents = fs.readFileSync(p).toString();
  var result = _.template(contents, data);
  if (!noOutput) {
    this.outputBlock(result);
  }
  return result;
};

/**
 * Build the HTML code for the form.
 * @param {Object} source The parsed form descriptor.
 * @return {string} HTML code.
 */
Generator.prototype.build = function(source) {
  var that = this;

  var form = {
    name: 'f' + this.id,
    objName: 'data',
  };
  var preData = {
    trySubmit: ' ',
    submit: 'submit',
    noFieldset: false,
  };
  _.each(source.descriptors, function(descriptor) {
    switch (descriptor.key) {
      case 'name':
        that.id = null;
        formId--;
        form.name = descriptor.value;
        break;

      case 'objName':
        form.objName = descriptor.value;

      case 'trySubmit':
        preData.trySubmit = ' ' + descriptor.value + '(); ';
        break;

      case 'submit':
        preData.submit = descriptor.value;
        break;

      case 'noFieldset':
        if (!_.isBoolean(descriptor.value)) {
          throw new Error('noFieldset value should be a boolean literal');
        }
        preData.noFieldset = descriptor.value;
        break;

      default:
        throw new Error('unrecognized descriptor in form: ' + descriptor.key);
    }
  });

  preData.name = form.name;
  preData.submit = preData.name + '.$valid && ' + preData.submit + '();';

  this.template('pre-form', preData);
  this.indent++;

  _.each(source.fields, function(field) {
    that.buildField(form, field);
  });

  this.indent--;
  this.template('post-form', {
    noFieldset: preData.noFieldset,
  });

  return this.blocks.join('\n');
};

Generator.prototype.buildField = function(form, field) {
  switch (field.type) {
    case 'input':
      this.buildInput(form, field);
      break;

    case 'textarea':
      this.buildTextarea(form, field);
      break;

    case 'select':
      this.buildSelect(form, field);
      break;

    case 'submit':
      this.buildSubmit(form, field);
      break;

    default:
      throw new Error('unrecognized field type: ' + field.type);
  }
};

Generator.prototype.mergeAttrs = function(original, attrs) {
  if (_.isArray(attrs)) {
    _.each(attrs, function(attr) {
      if (original[attr.key]) {
        throw new Error('trying to overwrite attribute: ' + attr.key);
      }
      original[attr.key] = attr.value;
    });
    return;
  }

  if (_.isObject(attrs)) {
    _.each(attrs, function(value, key) {
      if (original[key]) {
        throw new Error('trying to overwrite attribute: ' + key);
      }
      original[key] = value;
    });
    return;
  }

  throw new Error('attrs should be an array of descriptors or an object');
};

Generator.prototype.formatAttrs = function(attrs) {
  var result = '';
  _.each(attrs, function(value, key) {
    result += ' ' + key + '=' + '"' + value + '"';
  });
  return result;
};

Generator.prototype.buildInput = function(form, field) {
  var that = this;

  var data = {
    attrs: {
      type: 'text',
      placeholder: '',
      class: ['form-control'],
      name: form.name + field.name,
      id: form.name + field.name,
      'ng-model': form.objName + '.' + field.name,
    },
    containerAttrs: {},
    prefix: '',
    suffix: '',
    label: '',
  };
  _.each(field.descriptors, function(descriptor) {
    switch (descriptor.key) {
      case 'class':
        data.attrs.class.push(descriptor.value.split(' '));
        break;

      case 'id':
      case 'name':
      case 'ng-model':
      case 'placeholder':
      case 'type':
        data.attrs[descriptor.key] = descriptor.value;
        break;

      case 'attrs':
      case 'containerAttrs':
        that.mergeAttrs(data.attrs, descriptor.value);
        break;

      case 'label':
      case 'prefix':
      case 'suffix':
        data[descriptor.key] = descriptor.value;
        break;
    }
  });

  this.wrapField(form, field, data, function() {
    data.containerAttrs = that.formatAttrs(data.containerAttrs);
    data.attrs = that.formatAttrs(data.attrs);
    that.template('input', data);
  });
};

Generator.prototype.buildTextarea = function(form, field) {
  var that = this;

  var data = {
    attrs: {
      placeholder: '',
      class: ['form-control'],
      name: form.name + field.name,
      id: form.name + field.name,
      'ng-model': form.objName + '.' + field.name,
    },
    containerAttrs: {},
    label: '',
  };
  _.each(field.descriptors, function(descriptor) {
    switch (descriptor.key) {
      case 'class':
        data.attrs.class.push(descriptor.value.split(' '));
        break;

      case 'id':
      case 'name':
      case 'ng-model':
      case 'placeholder':
      case 'rows':
        data.attrs[descriptor.key] = descriptor.value;
        break;

      case 'attrs':
      case 'containerAttrs':
        that.mergeAttrs(data.attrs, descriptor.value);
        break;

      case 'label':
        data[descriptor.key] = descriptor.value;
        break;
    }
  });

  this.wrapField(form, field, data, function() {
    data.containerAttrs = that.formatAttrs(data.containerAttrs);
    data.attrs = that.formatAttrs(data.attrs);
    that.template('textarea', data);
  });
};

Generator.prototype.buildSelect = function(form, field) {
  var that = this;

  var data = {
    attrs: {
      class: ['form-control'],
      name: form.name + field.name,
      id: form.name + field.name,
      'ng-model': form.objName + '.' + field.name,
    },
    containerAttrs: {},
    label: '',
    options: {},
    ngRepeatOptions: null,
  };
  _.each(field.descriptors, function(descriptor) {
    switch (descriptor.key) {
      case 'class':
        data.attrs.class.push(descriptor.value.split(' '));
        break;

      case 'id':
      case 'name':
      case 'ng-model':
        data.attrs[descriptor.key] = descriptor.value;
        break;

      case 'attrs':
      case 'containerAttrs':
        that.mergeAttrs(data.attrs, descriptor.value);
        break;

      case 'options':
        that.mergeAttrs(data.options, descriptor.value);
        break;

      case 'label':
        data[descriptor.key] = descriptor.value;
        break;

      case 'ngRepeatOptions':
        if (!_.isArray(descriptor.value)) {
          throw new Error('ngRepeatOptions descriptor should be an array');
        }
        data.ngRepeatOptions = {};
        _.each(descriptor.value, function(attr) {
          switch (attr.key) {
            case 'repeat':
            case 'value':
            case 'label':
              data.ngRepeatOptions[attr.key] = attr.value;
              break;

            default:
              throw new Error('unrecognized ngRepeatOptions key: ' + attr.key);
          }
        });
        break;
    }
  });

  this.wrapField(form, field, data, function() {
    data.containerAttrs = that.formatAttrs(data.containerAttrs);
    data.attrs = that.formatAttrs(data.attrs);
    that.template('select', data);
  });
};

Generator.prototype.buildSubmit = function(form, field) {
  var that = this;

  var data = {
    attrs: {},
    containerAttrs: {},
    label: '',
    additionalContent: '',
    formName: form.name,
  };
  _.each(field.descriptors, function(descriptor) {
    switch (descriptor.key) {
      case 'attrs':
      case 'containerAttrs':
        that.mergeAttrs(data.attrs, descriptor.value);
        break;

      case 'label':
      case 'additionalContent':
        data[descriptor.key] = descriptor.value;
        break;
    }
  });

  data.containerAttrs = that.formatAttrs(data.containerAttrs);
  data.attrs = that.formatAttrs(data.attrs);
  that.template('submit', data);
};

Generator.prototype.wrapField = function(form, field, data, fn) {
  // Generate the validators first
  var valresult = this.buildValidators(form, field, data);
  this.mergeAttrs(data.attrs, valresult.attrs);

  // Open the field
  this.template('pre-field', {
    hasValidations: field.validators.length > 0,
    formName: form.name,
    name: data.attrs.name,
    id: data.attrs.id,
    label: data.label,
    custom: valresult.customErrors,
  });
  this.indent++;

  // Output the field and its validators
  fn();
  this.outputBlock(valresult.output);

  // Close the field
  this.indent--;
  this.template('post-field');
};

Generator.prototype.buildValidators = function(form, field, fieldData) {
  var that = this;

  var data = {
    attrs: {},
    output: '',
    customErrors: [],
  };

  // No validators, return default data
  if (!field.validators.length) {
    return data;
  }

  _.each(field.validators, function(validator) {
    // Check if the validator exists
    if (!validators[validator.name]) {
      throw new Error('validator not recognized: ' + validator.name);
    }

    var result = validators[validator.name](validator.arguments);

    // Check field type
    if (result.types.indexOf(field.type) === -1) {
      throw new Error('field type ' + field.type + ' not supported with ' +
        'validator ' + validator.name);
    }

    // Merge validator attributes
    that.mergeAttrs(data.attrs, result.attrs);

    // Save custom error if present
    if (result.customError) {
      data.customErrors.push('(' + result.customError + ')');
    }

    data.output += that.template('validation-error', {
      id: fieldData.attrs.id,
      name: fieldData.attrs.name,
      formName: form.name,
      error: result.error,
      customError: result.customError,
      message: validator.message,
    }, true);
  });

  data.customErrors = data.customErrors.join(' || ');

  var pre = this.template('pre-validation-errors', {
    name: fieldData.attrs.name,
    formName: form.name,
    custom: data.customErrors,
  }, true);

  var post = this.template('post-validation-errors', {}, true);

  data.output = pre + data.output + post;

  return data;
};

module.exports = function(source) {
  var generator = new Generator(formId++);
  return generator.build(source);
};
