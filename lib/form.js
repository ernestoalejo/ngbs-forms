'use strict';

var Input = require('./input'),
    Output = require('./output'),
    _ = require('underscore');


var formId = 0;


function Form() {
  this.id = formId++;
  this.name_ = 'f' + this.id;
  this.objName_ = 'data';
  this.trySubmit_ = '';
  this.submit_ = 'submit';
  this.noFieldset_ = false;

  this.fields = [];
}


Form.prototype.name = function(name) {
  formId--;
  this.id = null;
  this.name_ = name;
  return this;
};


Form.prototype.objName = function(objName) {
  this.objName_ = objName;
  return this;
};


Form.prototype.trySubmit = function(trySubmit) {
  this.trySubmit_ = trySubmit;
  return this;
};


Form.prototype.submit = function(submit) {
  this.submit_ = submit;
  return this;
};


Form.prototype.noFieldset = function(noFieldset) {
  this.noFieldset_ = noFieldset;
  return this;
};


Form.prototype.build = function() {
  var output = new Output(this);

  var preData = {
    trySubmit: ' ',
    submit: this.name_ + '.$valid && ' + this.submit_ + '();',
    noFieldset: false,
    name: this.name_,
  };
  if (this.trySubmit_) {
    preData.trySubmit = ' ' + this.trySubmit_ + '(); ';
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


module.exports = Form;
