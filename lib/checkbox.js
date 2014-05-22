'use strict';

var _ = require('underscore'),
    CheckboxValidators = require('./checkbox-validators');


function Checkbox(form, id) {
  this.form = form;

  this.attrs_ = {};
  this.class_ = [];
  this.containerAttrs_ = {};
  this.id_ = id;
  this.label_ = '';
  this.name_ = id;
  this.ngModel_ = form.objName_ + '.' + id;
  
  this.validators_ = [];
}


Checkbox.prototype.attrs = function(attrs) {
  this.attrs_ = attrs;
  return this;
};


Checkbox.prototype.class = function(cls) {
  if (_.isString(cls)) {
    cls = cls.split(' ');
  }
  if (cls.indexOf('form-control') === -1) {
    cls.push('form-control');
  }
  this.class_ = cls;
  return this;
};


Checkbox.prototype.containerAttrs = function(containerAttrs) {
  this.containerAttrs_ = containerAttrs;
  return this;
};


Checkbox.prototype.id = function(id) {
  this.id_ = id;
  return this;
};


Checkbox.prototype.label = function(label) {
  this.label_ = label;
  return this;
};


Checkbox.prototype.name = function(name) {
  this.name_ = name;
  return this;
};


Checkbox.prototype.ngModel = function(ngModel) {
  this.ngModel_ = ngModel;
  return this;
};


Checkbox.prototype.validators = function(fn) {
  fn(new CheckboxValidators(this));
  return this;
};


Checkbox.prototype.build = function(output) {
  var that = this;

  var label = this.label_;
  this.label_ = '';

  output.wrapField(this, function() {
    var attrs = output.mergeAttrs({
      type: 'checkbox',
      class: that.class_,
      name: that.name_,
      id: that.id_,
      'ng-model': that.ngModel_,
    }, that.attrs_);

    output.template('checkbox', {
      attrs: output.formatAttrs(attrs),
      containerAttrs: output.formatAttrs(that.containerAttrs_),
      label: label,
    });
  });
};


module.exports = Checkbox;
