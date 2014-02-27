
form {
  fields {
    select foo {
      label = 'foo'

      options {
        foo = 'bar'
      }

      ngRepeatOptions {
        repeat = 'item in items'
        value = 'gola'
        label = 'tt'
      }

      validators {
        required = 'tt'
      }
    }
  }
}
