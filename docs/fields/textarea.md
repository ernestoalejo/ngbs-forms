
Textarea field
==============

It generates a `<textarea>` tag in the form.

 * [attrs](#attrs)
 * [class](#class)
 * [containerAttrs](#containerAttrs)
 * [id](#id)
 * [label](#label)
 * [name](#name)
 * [ng-model](#ng-model)
 * [placeholder](#placeholder)
 * [rows](#rows)


### <a name="attrs"></a> attrs
*Default*: `{}`
*Type*: `Object`

Additional attributes for the textarea tag.


### <a name="class"></a> class
*Default*: (empty)
*Type*: `string`

A space-separated list of additional CSS classes to add to the textarea tag.

```
form {
  fields {
    textarea foo {
      class = 'foo bar baz'
    }
  }
}
```


### <a name="containerAttrs"></a> containerAttrs
*Default*: `{}`
*Type*: `Object`

Additional attributes for the field wrapper.


### <a name="id"></a> id
*Default*: (field.name)
*Type*: `string`

The ID attribute of the textarea tag. If not assigned it will be generated from
the field name.

```
form {
  fields {
    /* this textarea will have an id "foo" */
    textarea foo {}

    /* this textarea will have an id "foobarbaz" */
    textarea bar {
      id = 'foobarbaz'
    }
  }
}
```


### <a name="label"></a> label
*Default*: (empty)
*Type*: `string`

Label for the field. If empty it won't have one.


### <a name="name"></a> name
*Default*: (field.name)
*Type*: `string`

The name attribute of the textarea tag. If not assigned it will be generated from
the field name.


### <a name="ng-model"></a> ng-model
*Default*: (form.objName).(field.name)
*Type*: `string`

The scoped variable where Angular will save the value of this field.

```
form {
  fields {
    /* this will be saved to data.foo */
    textarea foo {}

    /* this will be saved to myvar */
    textarea bar {
      ng-model = 'myvar'
    }
  }
}
```


### <a name="placeholder"></a> placeholder
*Default*: (empty)
*Type*: `string`

The placeholder for the textarea tag. It will be always emitted on the code so it's
recommended to have a placeholder in all cases.


### <a name="rows"></a> rows
*Default*: (empty)
*Type*: `integer`

Number of rows of the textarea. If not present it will not be emitted in the code.
