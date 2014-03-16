'use strict';

var _ = require('underscore');


function Radios(form, id) {
  this.form = form;

  this.attrs_ = {};
  this.class_ = [];
  this.containerAttrs_ = {};
  this.id_ = form.name_ + id;
  this.label_ = '';
  this.name_ = form.name_ + id;
  this.ngModel_ = form.objName_ + '.' + id;
  this.options_ = {};
}


Radios.prototype.attrs = function(attrs) {
  this.attrs_ = attrs;
  return this;
};


Radios.prototype.class = function(cls) {
  if (_.isString(cls)) {
    cls = cls.split(' ');
  }
  if (cls.indexOf('form-control') === -1) {
    cls.push('form-control');
  }
  this.class_ = cls;
  return this;
};


Radios.prototype.containerAttrs = function(containerAttrs) {
  this.containerAttrs_ = containerAttrs;
  return this;
};


Radios.prototype.id = function(id) {
  this.id_ = id;
  return this;
};


Radios.prototype.label = function(label) {
  this.label_ = label;
  return this;
};


Radios.prototype.name = function(name) {
  this.name_ = name;
  return this;
};


Radios.prototype.ngModel = function(ngModel) {
  this.ngModel_ = ngModel;
  return this;
};


Radios.prototype.options = function(options) {
  this.options_ = options;
  return this;
};


Radios.prototype.build = function(output) {
  var that = this;

  var options = [];
  _.each(this.options_, function(value, key) {
    options.push({
      key: key,
      label: value,
      item: options.length,
    });
  });

  output.wrapField(this, function() {
    var attrs = output.mergeAttrs({
      type: 'radio',
      class: that.class_,
      name: that.name_,
      id: that.id_,
      'ng-model': that.ngModel_,
    }, that.attrs_);

    output.template('radios', {
      attrs: output.formatAttrs(attrs),
      containerAttrs: output.formatAttrs(that.containerAttrs_),
      options: options,
    });
  });
};


module.exports = Radios;
