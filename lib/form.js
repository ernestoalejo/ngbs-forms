'use strict';

var Input = require('./input'),
    Output = require('./output'),
    Select = require('./select'),
    Textarea = require('./textarea'),
    Static = require('./static'),
    Checkbox = require('./checkbox'),
    Radios = require('./radios'),
    Submit = require('./submit'),
    _ = require('underscore');


var formId = 0;


function Form() {
  this.id = formId++;
  this.name_ = 'f' + this.id;
  this.objName_ = 'data';
  this.trySubmitFunc_ = '';
  this.submitFunc_ = 'submit';
  this.noFieldset_ = false;
  this.attrs_ = {};

  this.fields = [];
}


Form.prototype.name = function(name) {
  this.name_ = name;
  return this;
};


/** @deprecated Use name instead directly. */
Form.prototype.nameOnly = function(name) {
  return this.name(name);
};


Form.prototype.objName = function(objName) {
  this.objName_ = objName;
  return this;
};


Form.prototype.trySubmitFunc = function(trySubmitFunc) {
  this.trySubmitFunc_ = trySubmitFunc;
  return this;
};


Form.prototype.submitFunc = function(submitFunc) {
  this.submitFunc_ = submitFunc;
  return this;
};


Form.prototype.attrs = function(attrs) {
  this.attrs_ = attrs;
  return this;
};


Form.prototype.noFieldset = function(noFieldset) {
  this.noFieldset_ = noFieldset;
  return this;
};


Form.prototype.build = function() {
  var output = new Output(this);

  var preData = {
    trySubmitFunc: ' ',
    submitFunc: this.name_ + '.$valid && ' + this.submitFunc_ + '();',
    noFieldset: this.noFieldset_,
    name: this.name_,
    attrs: output.formatAttrs(this.attrs_),
  };
  if (this.trySubmitFunc_) {
    preData.trySubmitFunc = ' ' + this.trySubmitFunc_ + '(); ';
  }
  output.template('pre-form', preData);

  output.indent++;
  _.each(this.fields, function(field) {
    field.build(output);
  });
  output.indent--;

  output.template('post-form', {
    noFieldset: preData.noFieldset,
  });

  return output.build();
};


Form.prototype.input = function(id) {
  var field = new Input(this, id);
  this.fields.push(field);
  return field;
};


Form.prototype.select = function(id) {
  var field = new Select(this, id);
  this.fields.push(field);
  return field;
};


Form.prototype.textarea = function(id) {
  var field = new Textarea(this, id);
  this.fields.push(field);
  return field;
};


Form.prototype.static = function() {
  var field = new Static(this);
  this.fields.push(field);
  return field;
};


Form.prototype.checkbox = function(id) {
  var field = new Checkbox(this, id);
  this.fields.push(field);
  return field;
};


Form.prototype.radios = function(id) {
  var field = new Radios(this, id);
  this.fields.push(field);
  return field;
};


Form.prototype.submit = function() {
  var field = new Submit(this);
  this.fields.push(field);
  return field;
};


module.exports = Form;
