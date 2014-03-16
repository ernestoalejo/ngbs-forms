'use strict';


function Static(form) {
  this.form = form;

  this.label_ = '';
  this.content_ = '';
  this.noWrap_ = false;
}


Static.prototype.label = function(label) {
  this.label_ = label;
  return this;
};


Static.prototype.content = function(content) {
  this.content_ = content;
  return this;
};


Static.prototype.noWrap = function() {
  this.noWrap_ = true;
  return this;
};


Static.prototype.build = function(output) {
  var that = this;

  if (this.noWrap_) {
    output.template('static', {
      content: this.content_,
    });
  } else {
    output.wrapField(this, function() {
      output.template('static', {
        content: that.content_,
      });
    });
  }
};


module.exports = Static;
