'use strict';

var TextareaValidators = require('./textarea-validators'),
    _ = require('underscore');


function Textarea(form, id) {
  this.form = form;

  this.attrs_ = {};
  this.class_ = ['form-control'];
  this.containerAttrs_ = {};
  this.id_ = id;
  this.label_ = '';
  this.name_ = id;
  this.ngModel_ = form.objName_ + '.' + id;
  this.placeholder_ = '';
  this.rows_ = 3;
  
  this.validators_ = [];
}


Textarea.prototype.attrs = function(attrs) {
  this.attrs_ = attrs;
  return this;
};


Textarea.prototype.class = function(cls) {
  if (_.isString(cls)) {
    cls = cls.split(' ');
  }
  if (cls.indexOf('form-control') === -1) {
    cls.push('form-control');
  }
  this.class_ = cls;
  return this;
};


Textarea.prototype.containerAttrs = function(containerAttrs) {
  this.containerAttrs_ = containerAttrs;
  return this;
};


Textarea.prototype.id = function(id) {
  this.id_ = id;
  return this;
};


Textarea.prototype.label = function(label) {
  this.label_ = label;
  return this;
};


Textarea.prototype.name = function(name) {
  this.name_ = name;
  return this;
};


Textarea.prototype.ngModel = function(ngModel) {
  this.ngModel_ = ngModel;
  return this;
};


Textarea.prototype.placeholder = function(placeholder) {
  this.placeholder_ = placeholder;
  return this;
};


Textarea.prototype.rows = function(rows) {
  this.rows_ = rows;
  return this;
};


Textarea.prototype.validators = function(fn) {
  fn(new TextareaValidators(this));
  return this;
};


Textarea.prototype.build = function(output) {
  var that = this;

  output.wrapField(this, function() {
    var attrs = output.mergeAttrs({
      placeholder: that.placeholder_,
      class: that.class_,
      name: that.name_,
      id: that.id_,
      'ng-model': that.ngModel_,
      rows: that.rows_,
    }, that.attrs_);

    output.template('textarea', {
      attrs: output.formatAttrs(attrs),
      containerAttrs: output.formatAttrs(that.containerAttrs_),
      rows: that.rows_,
    });
  });
};


module.exports = Textarea;
