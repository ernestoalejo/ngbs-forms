'use strict';

var _ = require('underscore'),
    _s = require('underscore.string'),
    path = require('path'),
    fs = require('fs');


function Output(form) {
  this.form = form;

  // Current additional indentation in the code
  this.indent = 0;

  // Output
  this.blocks = [];
}


Output.prototype.build = function() {
  return this.blocks.join('\n');
};


/**
 * Output a new block indenting it as needed.
 * @param {string} block The new block.
 */
Output.prototype.block = function(block) {
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
 */
Output.prototype.template = function(filename, data) {
  data = data || {};
  var p = path.join(__dirname, 'templates', filename + '.tpl');
  var contents = fs.readFileSync(p).toString();
  this.block(_.template(contents, data));
};


Output.prototype.mergeAttrs = function(original, attrs) {
  _.each(attrs, function(value, key) {
    if (!_.isUndefined(original[key])) {
      throw new Error('trying to overwrite attribute: ' + key);
    }
    original[key] = value;
  });
  return original;
};


/**
 * Format attributes to use them in HTML directly.
 * @param {Object} attrs The attributes.
 * @return {string} The formatted HTML for that attributes.
 */
Output.prototype.formatAttrs = function(attrs) {
  var result = '';
  _.each(attrs, function(value, key) {
    if (_.isArray(value)) {
      value = value.join(' ');
    }

    result += ' ' + key + '=' + '"' + value + '"';
  });
  return result;
};


Output.prototype.wrapField = function(field, fn) {
  var that = this;

  // Generate the validators first
  var customErrors = [];
  _.each(field.validators_, function(validator) {
    var result = validator();
    if (result.customError) {
      customErrors.push(result.customError);
    }
  });

  // Open the field
  this.template('pre-field', {
    hasValidations: field.validators_ && field.validators_.length > 0,
    formName: this.form.name_,
    name: field.name_,
    id: field.id_,
    label: field.label_,
    custom: customErrors.join(' || '),
  });
  this.indent++;

  // Output the field
  fn();

  // Output the validators of the field
  if (field.validators_ && field.validators_.length) {
    this.template('pre-validation-errors', {
      name: field.name_,
      formName: this.form.name_,
      custom: customErrors.join(' || '),
    });
    var lastBlock = that.blocks[that.blocks.length - 1];
    that.blocks[that.blocks.length - 1] = lastBlock.replace(/\n$/, '');

    _.each(field.validators_, function(validator) {
      var result = validator();
      that.template('validation-error', {
        id: field.id_,
        name: field.name_,
        formName: that.form.name_,
        error: result.error,
        customError: result.customError,
        message: result.message,
      });
      var lastBlock = that.blocks[that.blocks.length - 1];
      that.blocks[that.blocks.length - 1] = lastBlock.replace(/\n$/, '');
    });

    this.template('post-validation-errors');
  }

  // Close the field
  this.indent--;
  this.template('post-field');
};


module.exports = Output;

