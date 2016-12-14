'use strict';

var
  form       = require('../index'),
  fs         = require('fs'),
  mkdirp     = require('mkdirp'),
  path       = require('path'),
  expect     = require('expect.js')
;

function test (name, callback) {
  
  var
    generated = form.generate('test/fixtures/' + name + '.form.js'),
    expected = fs.readFileSync('test/expected/' + name + '.html')
  ;

  mkdirp(path.dirname('tmp/' + name + '.html'), function() {
    fs.writeFileSync('tmp/' + name + '.html', generated);
    expect( generated ).to.be( expected.toString() );
    callback();
  });

}

var test = function(name, callback) {
  var generated = form.generate('test/fixtures/' + name + '.form.js');

  var expected = fs.readFileSync('test/expected/' + name + '.html');
  mkdirp(path.dirname('tmp/' + name + '.html'), function() {
    fs.writeFileSync('tmp/' + name + '.html', generated);
    expect(generated).to.be(expected.toString());
    callback();
  });
};


describe('Full examples: ', function() {

  it('should generate the min example', function(callback) {
    test('min-example', callback);
  });

  it('should generate the full example', function(callback) {
    test('full-example', callback);
  });

  it('should generate the name example', function(callback) {
    test('name-example', callback);
  });

  it('should generate form with no fieldset', function(callback) {
    test('noFieldset-example', callback);
  });

});
