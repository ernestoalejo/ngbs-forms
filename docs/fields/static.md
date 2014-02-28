
Static field
============

This type of field wraps a piece of HTML in a field where you can apply the same
styles that other types have.

It has no descriptors nor name, only the raw content. For example:

```
form {
  fields {
    input foo {}

    static {
      <p class="helper-block">Additional help for the field or whatever</p>
    }
  }
}
```
