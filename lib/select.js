'use strict';

var SelectValidators = require('./select-validators'),
    _ = require('underscore');


function Select(form, id) {
  this.form = form;

  this.attrs_ = {};
  this.class_ = ['form-control'];
  this.containerAttrs_ = {};
  this.id_ = form.name_ + id;
  this.label_ = '';
  this.name_ = form.name_ + id;
  this.ngModel_ = form.objName_ + '.' + id;
  this.ngOptions_ = '';
  this.ngRepeatOptions_ = null;
  this.options_ = {};

  this.validators_ = [];
}


Select.prototype.attrs = function(attrs) {
  this.attrs_ = attrs;
  return this;
};


Select.prototype.class = function(cls) {
  if (_.isString(cls)) {
    cls = cls.split(' ');
  }
  if (cls.indexOf('form-control') === -1) {
    cls.push('form-control');
  }
  this.class_ = cls;
  return this;
};


Select.prototype.containerAttrs = function(containerAttrs) {
  this.containerAttrs_ = containerAttrs;
  return this;
};


Select.prototype.id = function(id) {
  this.id_ = id;
  return this;
};


Select.prototype.label = function(label) {
  this.label_ = label;
  return this;
};


Select.prototype.name = function(name) {
  this.name_ = name;
  return this;
};


Select.prototype.ngModel = function(ngModel) {
  this.ngModel_ = ngModel;
  return this;
};


Select.prototype.ngOptions = function(ngOptions) {
  this.ngOptions_ = ngOptions;
  return this;
};


Select.prototype.ngRepeatOptions = function(ngRepeatOptions) {
  this.ngRepeatOptions_ = ngRepeatOptions;
  return this;
};


Select.prototype.options = function(options) {
  this.options_ = options;
  return this;
};


Select.prototype.validators = function(fn) {
  fn(new SelectValidators(this));
  return this;
};


Select.prototype.build = function(output) {
  var that = this;

  output.wrapField(this, function() {
    var attrs = {
      class: that.class_,
      name: that.name_,
      id: that.id_,
      'ng-model': that.ngModel_,
    };
    if (that.ngOptions_) {
      attrs['ng-options'] = that.ngOptions_;
    }
    attrs = output.mergeAttrs(attrs, that.attrs_);

    output.template('select', {
      attrs: output.formatAttrs(attrs),
      containerAttrs: output.formatAttrs(that.containerAttrs_),
      options: that.options_,
      ngRepeatOptions: that.ngRepeatOptions_,
    });
  });
};


module.exports = Select;
