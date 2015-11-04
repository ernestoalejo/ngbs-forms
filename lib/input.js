'use strict';

var InputValidators = require('./input-validators'),
    _ = require('underscore');


function Input(form, id) {
  this.form = form;

  this.attrs_ = {};
  this.class_ = ['form-control'];
  this.containerAttrs_ = {};
  this.id_ = id;
  this.label_ = '';
  this.name_ = id;
  this.ngModel_ = form.objName_ + '.' + id;
  this.placeholder_ = '';
  this.prefix_ = '';
  this.suffix_ = '';
  this.prefixClass_ = 'input-group-addon';
  this.suffixClass_ = 'input-group-addon';
  this.type_ = 'text';
  
  this.validators_ = [];
}


Input.prototype.attrs = function(attrs) {
  this.attrs_ = attrs;
  return this;
};


Input.prototype.class = function(cls) {
  if (_.isString(cls)) {
    cls = cls.split(' ');
  }
  if (cls.indexOf('form-control') === -1) {
    cls.push('form-control');
  }
  this.class_ = cls;
  return this;
};


Input.prototype.containerAttrs = function(containerAttrs) {
  this.containerAttrs_ = containerAttrs;
  return this;
};


Input.prototype.id = function(id) {
  this.id_ = id;
  return this;
};


Input.prototype.label = function(label) {
  this.label_ = label;
  return this;
};


Input.prototype.name = function(name) {
  this.name_ = name;
  return this;
};


Input.prototype.ngModel = function(ngModel) {
  this.ngModel_ = ngModel;
  return this;
};


Input.prototype.placeholder = function(placeholder) {
  this.placeholder_ = placeholder;
  return this;
};


Input.prototype.prefix = function(prefix) {
  this.prefix_ = prefix;
  return this;
};


Input.prototype.suffix = function(suffix) {
  this.suffix_ = suffix;
  return this;
};

Input.prototype.prefixClass = function(prefixClass){
  this.prefixClass_ = prefixClass;
  return this;
}

Input.prototype.suffixClass = function(suffixClass){
  this.suffixClass_ = suffixClass;
  return this;
}

Input.prototype.type = function(type) {
  this.type_ = type;
  return this;
};


Input.prototype.validators = function(fn) {
  fn(new InputValidators(this));
  return this;
};


Input.prototype.build = function(output) {
  var that = this;

  output.wrapField(this, function() {
    var attrs = output.mergeAttrs({
      type: that.type_,
      placeholder: that.placeholder_,
      class: that.class_,
      name: that.name_,
      id: that.id_,
      'ng-model': that.ngModel_,
    }, that.attrs_);

    output.template('input', {
      attrs: output.formatAttrs(attrs),
      containerAttrs: output.formatAttrs(that.containerAttrs_),
      prefix: that.prefix_,
      suffix: that.suffix_,
      prefixClass: that.prefixClass_,
      suffixClass: that.suffixClass_
    });
  });
};


module.exports = Input;
