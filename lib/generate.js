'use strict';

var _ = require('underscore'),
    path = require('path'),
    Form = require('./form');


module.exports = function(filepath) {
  var generator = require(path.resolve(filepath));
  if (!_.isFunction(generator)) {
    throw new Error('the form module should export a function: ' + filepath);
  }

  var form = new Form();
  generator(form);
  return form.build();
};

// /**
//  * Build a new textarea field.
//  * @param {Object} form The form description.
//  * @param {Object} field The field description.
//  */
// Generator.prototype.buildTextarea = function(form, field) {
//   var that = this;

//   var data = {
//     attrs: {
//       placeholder: '',
//       class: ['form-control'],
//       name: form.name + field.name,
//       id: form.name + field.name,
//       'ng-model': form.objName + '.' + field.name,
//     },
//     containerAttrs: {},
//     label: '',
//   };
//   _.each(field.descriptors, function(descriptor) {
//     switch (descriptor.key) {
//       case 'class':
//         data.attrs.class.push(descriptor.value.split(' '));
//         break;

//       case 'id':
//       case 'name':
//       case 'ng-model':
//       case 'placeholder':
//       case 'rows':
//         data.attrs[descriptor.key] = descriptor.value;
//         break;

//       case 'attrs':
//       case 'containerAttrs':
//         that.mergeAttrs(data[descriptor.key], descriptor.value);
//         break;

//       case 'label':
//         data[descriptor.key] = descriptor.value;
//         break;

//       default:
//         throw new Error('unrecognized descriptor key: ' + descriptor.key);
//     }
//   });

//   this.wrapField(form, field, data, function() {
//     data.containerAttrs = that.formatAttrs(data.containerAttrs);
//     data.attrs = that.formatAttrs(data.attrs);
//     that.template('textarea', data);
//   });
// };

// /**
//  * Build a new select field.
//  * @param {Object} form The form description.
//  * @param {Object} field The field description.
//  */
// Generator.prototype.buildSelect = function(form, field) {
//   var that = this;

//   var data = {
//     attrs: {
//       class: ['form-control'],
//       name: form.name + field.name,
//       id: form.name + field.name,
//       'ng-model': form.objName + '.' + field.name,
//     },
//     containerAttrs: {},
//     label: '',
//     options: {},
//     ngRepeatOptions: null,
//   };
//   _.each(field.descriptors, function(descriptor) {
//     switch (descriptor.key) {
//       case 'class':
//         data.attrs.class.push(descriptor.value.split(' '));
//         break;

//       case 'id':
//       case 'name':
//       case 'ng-model':
//       case 'ng-options':
//         data.attrs[descriptor.key] = descriptor.value;
//         break;

//       case 'attrs':
//       case 'containerAttrs':
//         that.mergeAttrs(data[descriptor.key], descriptor.value);
//         break;

//       case 'options':
//         that.mergeAttrs(data.options, descriptor.value);
//         break;

//       case 'label':
//         data[descriptor.key] = descriptor.value;
//         break;

//       case 'ngRepeatOptions':
//         if (!_.isArray(descriptor.value)) {
//           throw new Error('ngRepeatOptions descriptor should be an array');
//         }
//         data.ngRepeatOptions = {};
//         _.each(descriptor.value, function(attr) {
//           switch (attr.key) {
//             case 'repeat':
//             case 'value':
//             case 'label':
//               data.ngRepeatOptions[attr.key] = attr.value;
//               break;

//             default:
//               throw new Error('unrecognized ngRepeatOptions key: ' + attr.key);
//           }
//         });
//         break;

//       default:
//         throw new Error('unrecognized descriptor key: ' + descriptor.key);
//     }
//   });

//   this.wrapField(form, field, data, function() {
//     data.containerAttrs = that.formatAttrs(data.containerAttrs);
//     data.attrs = that.formatAttrs(data.attrs);
//     that.template('select', data);
//   });
// };

// /**
//  * Build a new submit button.
//  * @param {Object} form The form description.
//  * @param {Object} field The field description.
//  */
// Generator.prototype.buildSubmit = function(form, field) {
//   var that = this;

//   var data = {
//     attrs: {},
//     containerAttrs: {},
//     label: '',
//     additionalContent: '',
//     formName: form.name,
//   };
//   _.each(field.descriptors, function(descriptor) {
//     switch (descriptor.key) {
//       case 'attrs':
//       case 'containerAttrs':
//         that.mergeAttrs(data[descriptor.key], descriptor.value);
//         break;

//       case 'label':
//       case 'additionalContent':
//         data[descriptor.key] = descriptor.value;
//         break;

//       default:
//         throw new Error('unrecognized descriptor key: ' + descriptor.key);
//     }
//   });

//   data.containerAttrs = that.formatAttrs(data.containerAttrs);
//   data.attrs = that.formatAttrs(data.attrs);
//   that.template('submit', data);
// };

// /**
//  * Build a new wrapper static content.
//  * @param {Object} form The form description.
//  * @param {Object} field The field description.
//  */
// Generator.prototype.buildStatic = function(form, field) {
//   this.template('static', {
//     content: field.content,
//   });
// };

// /**
//  * Build a new static content without any kind of wrapping.
//  * @param {Object} form The form description.
//  * @param {Object} field The field description.
//  */
// Generator.prototype.buildStaticNoWrap = function(form, field) {
//   this.template('static-no-wrap', {
//     content: field.content,
//   });
// };

// /**
//  * Build a new checkbox field.
//  * @param {Object} form The form description.
//  * @param {Object} field The field description.
//  */
// Generator.prototype.buildCheckbox = function(form, field) {
//   var that = this;

//   var data = {
//     attrs: {
//       type: 'checkbox',
//       class: [],
//       name: form.name + field.name,
//       id: form.name + field.name,
//       'ng-model': form.objName + '.' + field.name,
//     },
//     containerAttrs: {},
//     label: '',
//   };
//   _.each(field.descriptors, function(descriptor) {
//     switch (descriptor.key) {
//       case 'class':
//         data.attrs.class.push(descriptor.value.split(' '));
//         break;

//       case 'id':
//       case 'name':
//       case 'ng-model':
//         data.attrs[descriptor.key] = descriptor.value;
//         break;

//       case 'attrs':
//       case 'containerAttrs':
//         that.mergeAttrs(data[descriptor.key], descriptor.value);
//         break;

//       case 'label':
//         data[descriptor.key] = descriptor.value;
//         break;

//       default:
//         throw new Error('unrecognized descriptor key: ' + descriptor.key);
//     }
//   });

//   var label = data.label;
//   data.label = '';
//   this.wrapField(form, field, data, function() {
//     data.containerAttrs = that.formatAttrs(data.containerAttrs);
//     data.attrs = that.formatAttrs(data.attrs);
//     data.label = label;
//     that.template('checkbox', data);
//   });
// };

// /**
//  * Build a new radio field.
//  * @param {Object} form The form description.
//  * @param {Object} field The field description.
//  */
// Generator.prototype.buildRadio = function(form, field) {
//   var that = this;

//   var data = {
//     attrs: {
//       type: 'radio',
//       class: [],
//       name: form.name + field.name,
//       id: form.name + field.name,
//       'ng-model': form.objName + '.' + field.name,
//     },
//     options: {},
//     containerAttrs: {},
//     label: '',
//   };
//   _.each(field.descriptors, function(descriptor) {
//     switch (descriptor.key) {
//       case 'class':
//         data.attrs.class.push(descriptor.value.split(' '));
//         break;

//       case 'id':
//       case 'name':
//       case 'ng-model':
//         data.attrs[descriptor.key] = descriptor.value;
//         break;

//       case 'attrs':
//       case 'containerAttrs':
//         that.mergeAttrs(data[descriptor.key], descriptor.value);
//         break;

//       case 'label':
//         data[descriptor.key] = descriptor.value;
//         break;

//       case 'options':
//         that.mergeAttrs(data.options, descriptor.value);
//         break;

//       default:
//         throw new Error('unrecognized descriptor key: ' + descriptor.key);
//     }
//   });

//   var options = [];
//   _.each(data.options, function(value, key) {
//     options.push({
//       key: key,
//       label: value,
//       item: options.length,
//     });
//   });
//   data.options = options;

//   this.wrapField(form, field, data, function() {
//     data.containerAttrs = that.formatAttrs(data.containerAttrs);
//     data.attrs = that.formatAttrs(data.attrs);
//     that.template('radio', data);
//   });
// };

// /**
//  * Build the validations for a field.
//  * @param {Object} form The form description.
//  * @param {Object} field The field description.
//  * @param {Object} fieldData The field generated data (to extract the id, etc)
//  * @return {object} The validation generated data containing:
//  *   - attrs: New attributes that should be added to the field tag 
//  *            (input, select, ...)
//  *   - output: Output for the messages that should be added after the field.
//  *   - customErrors: Logic to highlight in red the field, apart from the $invalid
//  *                   that is always used.
//  */
// Generator.prototype.buildValidators = function(form, field, fieldData) {
//   var that = this;

//   var data = {
//     attrs: {},
//     output: '',
//     customErrors: [],
//   };

//   // No validators, return default data
//   if (!field.validators.length) {
//     return data;
//   }

//   _.each(field.validators, function(validator) {
//     // Check if the validator exists
//     if (!validators[validator.name]) {
//       throw new Error('validator not recognized: ' + validator.name);
//     }

//     var result = validators[validator.name](validator.arguments);

//     // Check field type
//     if (result.types.indexOf(field.type) === -1) {
//       throw new Error('field type ' + field.type + ' not supported with ' +
//         'validator ' + validator.name);
//     }

//     // Merge validator attributes
//     that.mergeAttrs(data.attrs, result.attrs);

//     // Save custom error if present
//     if (result.customError) {
//       data.customErrors.push('(' + result.customError + ')');
//     }

//     data.output += that.template('validation-error', {
//       id: fieldData.attrs.id,
//       name: fieldData.attrs.name,
//       formName: form.name,
//       error: result.error,
//       customError: result.customError,
//       message: validator.message,
//     }, true);
//   });

//   data.customErrors = data.customErrors.join(' || ');

//   var pre = this.template('pre-validation-errors', {
//     name: fieldData.attrs.name,
//     formName: form.name,
//     custom: data.customErrors,
//   }, true);

//   var post = this.template('post-validation-errors', {}, true);

//   data.output = pre + data.output + post;

//   return data;
// };
