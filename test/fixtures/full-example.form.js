'use strict';


module.exports = function(form) {
  form.input('myinput');

  form.input('myinputv')
    .label('Email')
    .type('email')
    .placeholder('test@example.com')
    .attrs({
      myarg1: 'myvalue1',
      myarg2: 'myvalue2',
    })
    .validators(function(field) {
      field.required('El email es obligatorio');
      field.minlength(3, 'El email debe tener al menos 3 caracteres');
      field.maxlength(4, 'El email debe tener como mucho 4 caracteres');
      field.email('required email');
    });

  form.input('myinputaffix')
    .prefix('myprefix')
    .suffix('mysuffix')
    .validators(function(field) {
      field.minlength(3, 'El email debe tener al menos 3 caracteres');
      field.regexp('/^[a-z]$/', 'My pattern');
    });

  form.input('myinputmyid')
    .label('myid')
    .id('myidtest')
    .validators(function(field) {
      field.required('required validation with the name');
    });

  form.input('myint')
    .type('number')
    .validators(function(field) {
      field.integer('integer required');
      field.minvalue(10, 'at least 10 required');
      field.maxvalue(99, 'at max 99 required');
    });

  form.input('myintzero')
    .type('number')
    .validators(function(field) {
      field.integer('integer required');
      field.positive('at least 0 required');
    });

  form.select('myselect');

  form.select('myselectoptions')
    .options({
      myvalue1: 'mylabel1',
      myvalue2: 'mylabel2',
    })
    .validators(function(field) {
      field.custom('myexpr', 'My message');
    });

  form.select('myselectng')
    .label('Select label')
    .ngOptions('items in list');

  form.select('myselectrepeat')
    .ngRepeatOptions({
      repeat: 'item in list',
      value: '{{ item.value }}',
      label: '{{ item.label }}',
    })
    .options({
      foo: 'bar',
    });

  form.textarea('mytextarea')
    .label('My textarea')
    .rows(7);

  form.static()
    .label('My Static')
    .content('<p>static content</p>');

  form.input('datepicker')
    .label('Datepicker field')
    .placeholder('DD/MM/AAAA')
    .attrs({
      'datepicker-popup': 'dd/MM/yyyy',
      'datepicker-manual': '',
      'datepicker-options': 'datepickerOptions',
    })
    .validators(function(field) {
      field.required('La fecha de finalización es obligatoria en formato DD/MM/AAAA');
      field.date('La fecha debe tener un formato válido DD/MM/AAAA');
      field.mindate('minDate', 'La fecha debe corresponder a hoy, o un día posterior');
    });

  form.static()
    .noWrap()
    .content('<p>static no wrapper content</p>');

  form.checkbox('mycheckbox')
    .label('My checkbox');

  form.radios('radios')
    .label('My radios')
    .options({
      foo: 'Foo option',
      bar: 'Bar option',
      baz: 'Baz option',
    });

  form.input('url')
    .type('url')
    .label('My url')
    .validators(function(field) {
      field.url('url required');
    });

  form.submit()
    .label('Send button');

  form.submit()
    .label('Send button')
    .additionalContent('<a href="#">Cancel</a>');

  form.submit()
    .label('Send button')
    .containerAttrs({
      foo: 'bar',
    })
    .attrs({
      baz: 'qux',
    });
};
