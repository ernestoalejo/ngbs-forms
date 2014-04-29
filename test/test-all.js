'use strict';

var
  form       = require('../index'),
  fs         = require('fs'),
  mkdirp     = require('mkdirp'),
  path       = require('path'),
  htmlparser = require('htmlparser'),
  expect     = require('expect.js'),
  handler    = null,
  parser     = null
;

function getHtml(html){
  handler = new htmlparser.DefaultHandler(function () {}, { verbose: false, ignoreWhitespace: true });
  parser  = new htmlparser.Parser(handler);
  parser.parseComplete(html);
  return handler.dom;
}

function getOptions(name){
  var options = {};
  options.generated = form.generate('test/fixtures/' + name + '.form.js');
  options.htmlGenerated = JSON.stringify( getHtml(options.generated) );
  options.expected = fs.readFileSync('test/expected/' + name + '.html');
  options.htmlExpected = JSON.stringify( getHtml(options.expected) );

  return options;
}

describe('Full examples: ', function() {
  it('should generate the min example', function(callback) {
    var opt = getOptions ('min-example');

    mkdirp(path.dirname('tmp/' + opt.name + '.html'), function() {
      fs.writeFileSync('tmp/' + opt.name + '.html', opt.generated);
      expect( opt.htmlGenerated ).to.be( opt.htmlExpected );
      callback();
    });
  });

  it('should generate the full example', function(callback) {
    var opt = getOptions ('full-example');

    mkdirp(path.dirname('tmp/' + opt.name + '.html'), function() {
      fs.writeFileSync('tmp/' + opt.name + '.html', opt.generated);
      expect(opt.htmlGenerated).to.be(opt.htmlExpected);
      callback();
    });
  });

  it('should generate the name example', function(callback) {
    var opt = getOptions ('name-example');

    mkdirp(path.dirname('tmp/' + opt.name + '.html'), function() {
      fs.writeFileSync('tmp/' + opt.name + '.html', opt.generated);
      expect(opt.htmlGenerated).to.be(opt.htmlExpected);
      callback();
    });
  });

  it('should generate form with no fieldset', function(callback) {
    var opt = getOptions ('noFieldset-example');

    mkdirp(path.dirname('tmp/' + opt.name + '.html'), function() {
      fs.writeFileSync('tmp/' + opt.name + '.html', opt.generated);
      expect(opt.htmlGenerated).to.be(opt.htmlExpected);
      callback();
    });
  });
});
