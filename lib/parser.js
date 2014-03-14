'use strict';

var parser = require('../lang.js').parser,
    Lexer = require('lex');

module.exports = function(contents) {
  var lex = new Lexer();
  parser.lexer = lex;

  var deep = 0, statesStack = [];

  var states = {
    initial: 0,
    simple_string: 1,
    fields: 2,
    double_string: 3,
    comment: 5,
    braced_content: 7,
  };

  lex.addRule(/\s+/, function() {
    // do nothing
  }, [states.initial, states.fields]);

  lex.addRule(/$/, function() {
    return 'EOF';
  }, [states.initial, states.fields]);

  lex.addRule(/{/, function() {
    return 'OPEN_BRACE';
  }, [states.initial, states.fields]);

  lex.addRule(/}/, function() {
    return 'CLOSE_BRACE';
  }, [states.initial, states.fields]);

  lex.addRule(/\(/, function() {
    return 'OPEN_PAREN';
  }, [states.initial, states.fields]);

  lex.addRule(/\)/, function() {
    return 'CLOSE_PAREN';
  }, [states.initial, states.fields]);

  lex.addRule(/=/, function() {
    return 'EQUAL';
  }, [states.initial, states.fields]);

  lex.addRule(/,/, function() {
    return 'COMMA';
  }, [states.initial, states.fields]);

  lex.addRule(/-?[0-9]+/, function(lexeme) {
    this.yytext = lexeme;
    return 'NUMBER';
  }, [states.initial, states.fields]);

  lex.addRule(/true/, function() {
    this.yytext = true;
    return 'BOOLEAN';
  }, [states.initial, states.fields]);

  lex.addRule(/false/, function() {
    this.yytext = false;
    return 'BOOLEAN';
  }, [states.initial, states.fields]);

  lex.addRule(/form/, function() {
    this.yytext = 'form';
    return 'FORM';
  }, [states.initial]);

  lex.addRule(/fields\s+{/, function() {
    this.state = states.fields;
    return 'FIELDS';
  }, [states.initial]);

  lex.addRule(/}/, function() {
    this.state = states.initial;
  }, [states.fields]);

  lex.addRule(/"/, function() {
    statesStack.push(this.state);
    this.state = states.double_string;
  }, [states.initial, states.fields]);

  lex.addRule(/(\\"|[^"])*/, function(lexeme) {
    this.yytext = lexeme.replace(/\\"/g, '"');
    return 'STRING';
  }, [states.double_string]);

  lex.addRule(/"/, function() {
    this.state = statesStack.pop();
    this.yytext = '';
    return 'STRING';
  }, [states.double_string]);

  lex.addRule(/'/, function() {
    statesStack.push(this.state);
    this.state = states.simple_string;
  }, [states.initial, states.fields]);

  lex.addRule(/(\\'|[^'])*/, function(lexeme) {
    this.yytext = lexeme.replace(/\\'/g, '\'');
    return 'STRING';
  }, [states.simple_string]);

  lex.addRule(/'/, function() {
    this.state = statesStack.pop();
    this.yytext = '';
    return 'STRING';
  }, [states.simple_string]);

  lex.addRule(/[A-Za-z0-9_-]+/, function(lexeme) {
    this.yytext = lexeme;
    return 'NAME';
  }, [states.initial]);

  lex.addRule(/[A-Za-z0-9_-]+/, function(lexeme) {
    this.yytext = lexeme;

    var tokens = {
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
  }, [states.fields]);

  lex.addRule(/static\s+\{/, function() {
    this.state = states.braced_content;
    deep++;
    return 'STATIC';
  }, [states.fields]);

  lex.addRule(/staticNoWrap\s+\{/, function() {
    this.state = states.braced_content;
    deep++;
    return 'STATIC_NO_WRAP';
  }, [states.fields]);

  lex.addRule(/(\\{|\\}|[^{}])+/, function(lexeme) {
    this.yytext = lexeme.replace(/\\{/, '{').replace(/\\}/, '}');
    return 'BRACED_PART';
  }, [states.braced_content]);

  lex.addRule(/{/, function() {
    deep++;
    this.yytext = '{';
    return 'BRACED_PART';
  }, [states.braced_content]);

  lex.addRule(/}/, function() {
    deep--;
    if (deep === 0) {
      this.state = states.fields;
      return;
    }

    this.yytext = '}';
    return 'BRACED_PART';
  }, [states.braced_content]);

  lex.addRule(/\/\*/, function() {
    statesStack.push(this.state);
    this.state = states.comment;
  }, [states.initial, states.fields]);

  lex.addRule(/(\*[^\/]|[^*])*/, function() {
    // ignore comments
  }, [states.comment]);

  lex.addRule(/\*\//, function() {
    this.state = statesStack.pop();
  }, [states.comment]);

  return parser.parse(contents);
};

