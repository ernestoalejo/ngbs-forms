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

/**
 * Build a new field.
 * @param {Object} form The form description.
 * @param {Object} field The field description.
 */
Generator.prototype.buildField = function(form, field) {
  if (field.name && field.name.indexOf('-') > -1) {
    throw new Error('field ids cannot have dashes');
  }
  
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

    case 'static':
      this.buildStatic(form, field);
      break;

    case 'static-no-wrap':
      this.buildStaticNoWrap(form, field);
      break;

    case 'checkbox':
      this.buildCheckbox(form, field);
      break;

    case 'radio':
      this.buildRadio(form, field);
      break;

    default:
      throw new Error('unrecognized field type: ' + field.type);
  }
};

/**
 * Merge new attributes with the original ones. It throws an error if it founds
 * a repeated key.
 * You can pass an array of {key: XX, value: XX} attrs or directly an object with
 * {attr1key: attr1value, attr2key: attr2value} pairs.
 * @param {Object} original The original attributes
 * @param {Array|Object} attrs The new attributes
 */
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

/**
 * Format attributes to use them in HTML directly.
 * @param {Object} attrs The attributes.
 * @return {string} The formatted HTML for that attributes.
 */
Generator.prototype.formatAttrs = function(attrs) {
  var result = '';
  _.each(attrs, function(value, key) {
    if (_.isArray(value)) {
      value = value.join(' ');
    }

    result += ' ' + key + '=' + '"' + value + '"';
  });
  return result;
};

/**
 * Build a new input field.
 * @param {Object} form The form description.
 * @param {Object} field The field description.
 */
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
        that.mergeAttrs(data[descriptor.key], descriptor.value);
        break;

      case 'label':
      case 'prefix':
      case 'suffix':
        data[descriptor.key] = descriptor.value;
        break;

      default:
        throw new Error('unrecognized descriptor key: ' + descriptor.key);
    }
  });

  this.wrapField(form, field, data, function() {
    data.containerAttrs = that.formatAttrs(data.containerAttrs);
    data.attrs = that.formatAttrs(data.attrs);
    that.template('input', data);
  });
};

/**
 * Build a new textarea field.
 * @param {Object} form The form description.
 * @param {Object} field The field description.
 */
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
        that.mergeAttrs(data[descriptor.key], descriptor.value);
        break;

      case 'label':
        data[descriptor.key] = descriptor.value;
        break;

      default:
        throw new Error('unrecognized descriptor key: ' + descriptor.key);
    }
  });

  this.wrapField(form, field, data, function() {
    data.containerAttrs = that.formatAttrs(data.containerAttrs);
    data.attrs = that.formatAttrs(data.attrs);
    that.template('textarea', data);
  });
};

/**
 * Build a new select field.
 * @param {Object} form The form description.
 * @param {Object} field The field description.
 */
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
      case 'ng-options':
        data.attrs[descriptor.key] = descriptor.value;
        break;

      case 'attrs':
      case 'containerAttrs':
        that.mergeAttrs(data[descriptor.key], descriptor.value);
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

      default:
        throw new Error('unrecognized descriptor key: ' + descriptor.key);
    }
  });

  this.wrapField(form, field, data, function() {
    data.containerAttrs = that.formatAttrs(data.containerAttrs);
    data.attrs = that.formatAttrs(data.attrs);
    that.template('select', data);
  });
};

/**
 * Build a new submit button.
 * @param {Object} form The form description.
 * @param {Object} field The field description.
 */
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
        that.mergeAttrs(data[descriptor.key], descriptor.value);
        break;

      case 'label':
      case 'additionalContent':
        data[descriptor.key] = descriptor.value;
        break;

      default:
        throw new Error('unrecognized descriptor key: ' + descriptor.key);
    }
  });

  data.containerAttrs = that.formatAttrs(data.containerAttrs);
  data.attrs = that.formatAttrs(data.attrs);
  that.template('submit', data);
};

/**
 * Build a new wrapper static content.
 * @param {Object} form The form description.
 * @param {Object} field The field description.
 */
Generator.prototype.buildStatic = function(form, field) {
  this.template('static', {
    content: field.content,
  });
};

/**
 * Build a new static content without any kind of wrapping.
 * @param {Object} form The form description.
 * @param {Object} field The field description.
 */
Generator.prototype.buildStaticNoWrap = function(form, field) {
  this.template('static-no-wrap', {
    content: field.content,
  });
};

/**
 * Build a new checkbox field.
 * @param {Object} form The form description.
 * @param {Object} field The field description.
 */
Generator.prototype.buildCheckbox = function(form, field) {
  var that = this;

  var data = {
    attrs: {
      type: 'checkbox',
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
        data.attrs[descriptor.key] = descriptor.value;
        break;

      case 'attrs':
      case 'containerAttrs':
        that.mergeAttrs(data[descriptor.key], descriptor.value);
        break;

      case 'label':
        data[descriptor.key] = descriptor.value;
        break;

      default:
        throw new Error('unrecognized descriptor key: ' + descriptor.key);
    }
  });

  var label = data.label;
  data.label = '';
  this.wrapField(form, field, data, function() {
    data.containerAttrs = that.formatAttrs(data.containerAttrs);
    data.attrs = that.formatAttrs(data.attrs);
    data.label = label;
    that.template('checkbox', data);
  });
};

/**
 * Build a new radio field.
 * @param {Object} form The form description.
 * @param {Object} field The field description.
 */
Generator.prototype.buildRadio = function(form, field) {
  var that = this;

  var data = {
    attrs: {
      type: 'radio',
      class: ['form-control'],
      name: form.name + field.name,
      id: form.name + field.name,
      'ng-model': form.objName + '.' + field.name,
    },
    options: {},
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
        data.attrs[descriptor.key] = descriptor.value;
        break;

      case 'attrs':
      case 'containerAttrs':
        that.mergeAttrs(data[descriptor.key], descriptor.value);
        break;

      case 'label':
        data[descriptor.key] = descriptor.value;
        break;

      case 'options':
        that.mergeAttrs(data.options, descriptor.value);
        break;

      default:
        throw new Error('unrecognized descriptor key: ' + descriptor.key);
    }
  });

  var options = [];
  _.each(data.options, function(value, key) {
    options.push({
      key: key,
      label: value,
      item: options.length,
    });
  });
  data.options = options;

  this.wrapField(form, field, data, function() {
    data.containerAttrs = that.formatAttrs(data.containerAttrs);
    data.attrs = that.formatAttrs(data.attrs);
    that.template('radio', data);
  });
};

/**
 * Wrap a field with validations and other goodies.
 * @param {Object} form The form description.
 * @param {Object} field The field description.
 * @param {Object} data The field generated data (to extract the id, the name, etc)
 * @param {Function} fn The function to call to generate the field code.
 */
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
  if (valresult.output) {
    this.outputBlock(valresult.output);
  }

  // Close the field
  this.indent--;
  this.template('post-field');
};

/**
 * Build the validations for a field.
 * @param {Object} form The form description.
 * @param {Object} field The field description.
 * @param {Object} fieldData The field generated data (to extract the id, etc)
 * @return {object} The validation generated data containing:
 *   - attrs: New attributes that should be added to the field tag 
 *            (input, select, ...)
 *   - output: Output for the messages that should be added after the field.
 *   - customErrors: Logic to highlight in red the field, apart from the $invalid
 *                   that is always used.
 */
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
