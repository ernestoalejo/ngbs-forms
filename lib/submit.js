'use strict';


function Submit(form) {
  this.form = form;

  this.attrs_ = {};
  this.containerAttrs_ = {};
  this.label_ = '';
  this.additionalContent_ = '';
}


Submit.prototype.attrs = function(attrs) {
  this.attrs_ = attrs;
  return this;
};


Submit.prototype.containerAttrs = function(containerAttrs) {
  this.containerAttrs_ = containerAttrs;
  return this;
};


Submit.prototype.label = function(label) {
  this.label_ = label;
  return this;
};


Submit.prototype.additionalContent = function(additionalContent) {
  this.additionalContent_ = additionalContent;
  return this;
};


Submit.prototype.build = function(output) {
  output.template('submit', {
    attrs: output.formatAttrs(this.attrs_),
    containerAttrs: output.formatAttrs(this.containerAttrs_),
    additionalContent: this.additionalContent_,
    label: this.label_,
    formName: this.form.prefix_,
  });
};


module.exports = Submit;
