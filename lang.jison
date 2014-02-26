
%{
  function Form(descriptors, fields) {
    this.descriptors = descriptors;
    this.fields = fields;
  }

  function FDescriptor(key, value) {
    this.key = key;
    this.value = value;
  }

  function FInput(name, descriptors, validators) {
    this.type = 'input';
    this.name = name;
    this.descriptors = descriptors;
    this.validators = validators;
  }

  function FTextarea(name, descriptors, validators) {
    this.type = 'textarea';
    this.name = name;
    this.descriptors = descriptors;
    this.validators = validators;
  }

  function FSelect(name, descriptors, validators) {
    this.type = 'select';
    this.name = name;
    this.descriptors = descriptors;
    this.validators = validators;
  }

  function FCheckbox(name, descriptors, validators) {
    this.type = 'checkbox';
    this.name = name;
    this.descriptors = descriptors;
    this.validators = validators;
  }

  function FRadio(name, descriptors, validators) {
    this.type = 'radio';
    this.name = name;
    this.descriptors = descriptors;
    this.validators = validators;
  }

  function FSubmit(name, descriptors) {
    this.type = 'submit';
    this.name = name;
    this.descriptors = descriptors;
  }

  function FStatic(content) {
    this.type = 'static';
    this.content = content;
  }

  function FStaticNoWrap(content) {
    this.type = 'static-no-wrap';
    this.content = content;
  }

  function FValidator(name, arguments, validators) {
    this.name = name;
    this.arguments = arguments;
    this.validators = validators;
  }
%}

%start Form

%%

Form
  : EOF
    { return new Form([], []); }
  | FORM OPEN_BRACE Descriptors Fields CLOSE_BRACE
    { return new Form($3, $4); }
  ;

Descriptors
  : /* empty */
    { $$ = []; }
  | Descriptor Descriptors
    { $$ = [$1].concat($2); }
  ;

Descriptor
  : NAME EQUAL STRING
    { $$ = new FDescriptor($1, $3); }
  | NAME OPEN_BRACE PlainDescriptors CLOSE_BRACE
    { $$ = new FDescriptor($1, $3); }
  ;

PlainDescriptors
  : /* empty */
    { $$ = []; }
  | PlainDescriptor PlainDescriptors
    { $$ = [$1].concat($2); }
  ;

PlainDescriptor
  : NAME EQUAL STRING
    { $$ = new FDescriptor($1, $3); }
  ;

Fields
  : /* empty */
    { $$ = []; }
  | FIELDS OPEN_BRACE FieldList CLOSE_BRACE
    { $$ = $3 }
  ;

FieldList
  : /* empty */
    { $$ = []; }
  | Field FieldList
    { $$ = [$1].concat($2); }
  ;

Field
  : INPUT NAME OPEN_BRACE Descriptors Validators CLOSE_BRACE
    { $$ = new FInput($2, $4, $5); }
  | TEXTAREA NAME OPEN_BRACE Descriptors Validators CLOSE_BRACE
    { $$ = new FTextarea($2, $4, $5); }
  | SELECT NAME OPEN_BRACE Descriptors Validators CLOSE_BRACE
    { $$ = new FSelect($2, $4, $5); }
  | CHECKBOX NAME OPEN_BRACE Descriptors Validators CLOSE_BRACE
    { $$ = new FCheckbox($2, $4, $5); }
  | RADIO NAME OPEN_BRACE Descriptors Validators CLOSE_BRACE
    { $$ = new FRadio($2, $4, $5); }
  | SUBMIT NAME OPEN_BRACE Descriptors CLOSE_BRACE
    { $$ = new FSubmit($2, $4, $5); }
  | STATIC BracedContent
    { $$ = new FStatic($2.join('')); }
  | STATIC_NO_WRAP BracedContent
    { $$ = new FStaticNoWrap($2.join('')); }
  ;

BracedContent
  : BRACED_PART
    { $$ = [$1]; }
  | BRACED_PART BracedContent
    { $$ = [$1].concat($2); }
  ;

Validators
  : /* empty */
    { $$ = []; }
  | VALIDATORS OPEN_BRACE ValidatorList CLOSE_BRACE
    { $$ = $3; }
  ;

ValidatorList
  : /* empty */
    { $$ = []; }
  | Validator ValidatorList
    { $$ = [$1].concat($2); }
  ;

Validator
  : NAME Arguments EQUAL STRING
    { $$ = new FValidator($1, $2, $4); }
  ;

Arguments
  : /* empty */
    { $$ = []; }
  | OPEN_PAREN ArgumentList CLOSE_PAREN
    { $$ = $2; }
  ;

ArgumentList
  : /* empty */
    { $$ = []; }
  | Argument
    { $$ = [$1]; }
  | Argument COMMA ArgumentList
    { $$ = [$1].concat($3); }
  ;

Argument
  : STRING
  | NUMBER
  ;

%%
