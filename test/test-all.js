'use strict';

var form = require('../index'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    path = require('path'),
    expect = require('expect.js');


describe('Full examples: ', function() {
  it('should generate the min example', function(callback) {
    var name = 'min-example';
    var generated = form.generate('test/fixtures/' + name + '.form.js');

    var expected = fs.readFileSync('test/expected/' + name + '.html');
    mkdirp(path.dirname('tmp/' + name + '.html'), function() {
      fs.writeFileSync('tmp/' + name + '.html', generated);
      expect(generated).to.be(expected.toString());
      callback();
    });
  });

  it('should generate the full example', function(callback) {
    var name = 'full-example';
    var generated = form.generate('test/fixtures/' + name + '.form.js');

    var expected = fs.readFileSync('test/expected/' + name + '.html');
    mkdirp(path.dirname('tmp/' + name + '.html'), function() {
      fs.writeFileSync('tmp/' + name + '.html', generated);
      expect(generated).to.be(expected.toString());
      callback();
    });
  });

  it('should generate the name example', function(callback) {
    var name = 'name-example';
    var generated = form.generate('test/fixtures/' + name + '.form.js');

    var expected = fs.readFileSync('test/expected/' + name + '.html');
    mkdirp(path.dirname('tmp/' + name + '.html'), function() {
      fs.writeFileSync('tmp/' + name + '.html', generated);
      expect(generated).to.be(expected.toString());
      callback();
    });
  });

  it('should generate form with no fieldset', function(callback) {
    var name = 'noFieldset-example';
    var generated = form.generate('test/fixtures/' + name + '.form.js');

    var expected = fs.readFileSync('test/expected/' + name + '.html');
    mkdirp(path.dirname('tmp/' + name + '.html'), function() {
      fs.writeFileSync('tmp/' + name + '.html', generated);
      expect(generated).to.be(expected.toString());
      callback();
    });
  });
});
