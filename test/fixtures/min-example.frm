
form {
  fields {
    input myinput {
      foo = 'bar'

      attrs {
        bar = 'baz'
        baz = 'qux'
      }

      validators {
        required = 'message required'
        minlength(3) = 'message minlength'
        minlength(3, 'hola') = 'message minlength'
      }
    }

    staticNoWrap {
      Hola buenas
    }
  }
}
