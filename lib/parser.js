'use strict';

var parser = require('../lang.js').parser,
    Lexer = require('lex');

module.exports = function(contents) {
  var lex = new Lexer();
  parser.lexer = lex;

  var deep = 0;

  lex.addRule(/\s+/, function() {
    // do nothing
  });

  lex.addRule(/$/, function() {
    return 'EOF';
  });

  lex.addRule(/\{/, function() {
    return 'OPEN_BRACE';
  });

  lex.addRule(/\}/, function() {
    return 'CLOSE_BRACE';
  });

  lex.addRule(/\(/, function() {
    return 'OPEN_PAREN';
  });

  lex.addRule(/\)/, function() {
    return 'CLOSE_PAREN';
  });

  lex.addRule(/=/, function() {
    return 'EQUAL';
  });

  lex.addRule(/,/, function() {
    return 'COMMA';
  });

  lex.addRule(/-?[0-9]+/, function(lexeme) {
    this.yytext = lexeme;
    return 'NUMBER';
  });

  lex.addRule(/[A-Za-z0-9_-]+/, function(lexeme) {
    this.yytext = lexeme;

    var tokens = {
      form: 'FORM',
      fields: 'FIELDS',
      input: 'INPUT',
      select: 'SELECT',
      textarea: 'TEXTAREA',
      checkbox: 'CHECKBOX',
      submit: 'SUBMIT',
      validators: 'VALIDATORS',
      radio: 'RADIO',
    };
    if (tokens[lexeme]) {
      return tokens[lexeme];
    }
    return 'NAME';
  });

  lex.addRule(/"/, function() {
    this.state = 'double_string';
  });

  lex.addRule(/(\\\"|[^"])*/, function(lexeme) {
    this.yytext = lexeme;
    return 'STRING';
  }, ['double_string']);

  lex.addRule(/"/, function() {
    this.state = 0;
  }, ['double_string']);

  lex.addRule(/'/, function() {
    this.state = 'simple_string';
  });

  lex.addRule(/(\\\'|[^'])*/, function(lexeme) {
    this.yytext = lexeme;
    return 'STRING';
  }, ['simple_string']);

  lex.addRule(/'/, function() {
    this.state = 0;
  }, ['simple_string']);

  lex.addRule(/static\s+\{/, function() {
    this.state = 'braced';
    deep++;
    return 'STATIC';
  });

  lex.addRule(/staticNoWrap\s+\{/, function() {
    this.state = 'braced';
    deep++;
    return 'STATIC_NO_WRAP';
  });

  lex.addRule(/(\\\{|\\\}|[^{}])+/, function(lexeme) {
    this.yytext = lexeme.replace(/\\\{/, '{').replace(/\\\}/, '}');
    return 'BRACED_PART';
  }, ['braced']);

  lex.addRule(/\{/, function() {
    deep++;
    this.yytext = '{';
    return 'BRACED_PART';
  }, ['braced']);

  lex.addRule(/\}/, function() {
    deep--;
    if (deep === 0) {
      this.state = 0;
      return;
    }

    this.yytext = '}';
    return 'BRACED_PART';
  }, ['braced']);

  // lex.addRule(/case\s+\(/, function() {
  //   this.state = 'case';
  //   deep++;
  // });

  // lex.addRule(/(\\\(|\\\)|[^()])+/, function(lexeme) {
  //   this.yytext = lexeme.replace(/\\\(/, '(').replace(/\\\)/, ')');
  //   return 'CASE_PART';
  // }, ['case']);

  // lex.addRule(/\(/, function() {
  //   deep++;
  //   this.yytext = '(';
  //   return 'CASE_PART';
  // }, ['case']);

  // lex.addRule(/\)/, function() {
  //   deep--;
  //   if (deep === 0) {
  //     this.state = 0;
  //     return;
  //   }

  //   this.yytext = ')';
  //   return 'CASE_PART';
  // }, ['case']);

  lex.addRule(/\/\*/, function() {
    this.state = 'comment';
  });

  lex.addRule(/(\*[^\/]|[^*])*/, function() {
    // ignore comments
  }, ['comment']);

  lex.addRule(/\*\//, function() {
    this.state = 0;
  }, ['comment']);

  return parser.parse(contents);
};

