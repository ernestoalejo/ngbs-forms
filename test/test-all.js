'use strict';

var form = require('../index'),
    fs = require('fs'),
    mkdirp = require('mkdirp'),
    path = require('path'),
    expect = require('expect.js');

describe('Full examples: ', function() {
  it('should generate the min example', function(callback) {
    var name = 'min-example';
    var contents = fs.readFileSync('test/fixtures/' + name + '.frm');
    var source = form.parse(contents.toString());

    console.log(form.generate(source));
    callback();
    /*var generated = form.generate(source);

    var expected = fs.readFileSync('test/expected/' + name + '.html');
    mkdirp(path.dirname('tmp/' + name + '.html'), function() {
      fs.writeFileSync('tmp/' + name + '.html', generated);
      expect(generated).to.be(expected.toString());
      callback();
    });*/
  });
});
