
form {
  fields {
    input foo {
      validators {
        required = "required msg"
        minlength(4) = "minlength msg"
        custom("foobar") = "custom msg"
      }
    }
  }
}
