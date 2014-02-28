
form {
  fields {
    input myinput {}

    input myinputv {
      label = 'Email'
      type = 'email'
      placeholder = 'test@example'

      attrs {
        myarg1 = 'myvalue1'
        myarg2 = 'myvalue2'
      }

      validators {
        required = 'El email es obligatorio'
        minlength(3) = 'El email debe tener al menos 3 caracteres'
        maxlength(4) = 'El email debe tener como mucho 4 caracteres'
        email  = 'required email'
      }
    }

    input myinputaffix {
      prefix = 'myprefix'
      suffix = 'mysuffix'

      validators {
        minlength(3) = 'El email debe tener al menos 3 caracteres'
        regexp('/^[a-z]$/') = 'My pattern'
      }
    }

    input myinputmyid {
      label = 'myid'
      id = 'myidtest'

      validators {
        required = 'required validation with the name'
      }
    }

    input myint {
      type = 'number'

      validators {
        integer = 'integer required'
        minvalue(10) = 'at least 10 required'
        maxvalue(99) = 'at max 99 required'
      }
    }

    input myintzero {
      type = 'number'

      validators {
        integer = 'integer required'
        positive = 'at least 0 required'
      }
    }

    select myselect {}

    select myselectoptions {
      options {
        myvalue1 = 'mylabel1'
        myvalue2 = 'mylabel2'
      }

      validators {
        custom('myexpr') = 'My message'
      }
    }

    select myselectng {
      label = 'Select label'
      ng-options = 'items in list'
    }

    select myselectrepeat {
      ngRepeatOptions {
        repeat = 'item in list'
        value = '{{ item.value }}'
        label = '{{ item.label }}'
      }

      options {
        foo = 'bar'
      }
    }

    textarea mytextarea {
      label = 'My textarea'
      rows = 7
    }

    static {
      <label class="control-label">My Static</label>

      <p>static content</p>
    }

    input datepicker {
      label = 'Datepicker field'
      placeholder = 'DD/MM/AAAA'

      attrs {
        datepicker-popup = 'dd/MM/yyyy'
        datepicker-manual = ''
        datepicker-options = 'datepickerOptions'
      }

      validators {
        required = 'La fecha de finalización es obligatoria en formato DD/MM/AAAA'
        date = 'La fecha debe tener un formato válido DD/MM/AAAA'
        mindate('minDate') = 'La fecha debe corresponder a hoy, o un día posterior'
      }
    }

    staticNoWrap {
      <p>static no wrapper content</p>
    }

    checkbox mycheckbox {
      label = 'My checkbox'
    }

    radio radios {
      label = 'My radios'

      options {
        foo = 'Foo option'
        bar = 'Bar option'
        baz = 'Baz option'
      }
    }

    input url {
      type = 'url'
      label = 'My url'

      validators {
        url = 'url required'
      }
    }

    submit {
      label = 'Send button'
    }

    submit {
      label = 'Send button'
      additionalContent = '<a href="#">Cancel</a>'
    }

    submit {
      label = 'Send button'

      containerAttrs {
        foo = 'bar'
      }

      attrs {
        baz = 'qux'
      }
    }
  }
}
