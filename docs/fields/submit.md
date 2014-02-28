
Submit field
============

It generates a submit field with a standard button (`btn-primary`).

 * [additionalContent](#additionalContent)
 * [attrs](#attrs)
 * [containerAttrs](#containerAttrs)
 * [label](#label)


### <a name="additionalContent"></a> additionalContent
*Default*: (empty)
*Type*: `string`

Additional content that will be inserted just after the button. It lets you add
a cancel link for example.

```
form {
  fields {
    submit {
      label = 'Send button'
      additionalContent = '<a href="foobar">Cancel edit</a>'
    }
  }
}
```

### <a name="attrs"></a> attrs
*Default*: `{}`
*Type*: `Object`

Additional attributes for the submit button.


### <a name="containerAttrs"></a> containerAttrs
*Default*: `{}`
*Type*: `Object`

Additional attributes for the field wrapper.


### <a name="label"></a> label
*Default*: (empty)
*Type*: `string`

Label for the buttom. The button will be generated always, with an empty label
or not; so it's recommended to specify it in all cases.
