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
