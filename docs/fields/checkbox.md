
Checkbox field
==============

It generates a checkbox in the form, with the special label position (after the
field, not before as for a normal input tag).

 * [attrs](#attrs)
 * [class](#class)
 * [containerAttrs](#containerAttrs)
 * [id](#id)
 * [label](#label)
 * [name](#name)
 * [ng-model](#ng-model)


### <a name="attrs"></a> attrs
*Default*: `{}`
*Type*: `Object`

Additional attributes for the input tag.


### <a name="class"></a> class
*Default*: (empty)
*Type*: `string`

A space-separated list of additional CSS classes to add to the input tag.

```
form {
  fields {
    checkbox foo {
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

The ID attribute of the input tag. If not assigned it will be generated from
the field name.

```
form {
  fields {
    /* this checkbox will have an id "foo" */
    checkbox foo {}

    /* this checkbox will have an id "foobarbaz" */
    checkbox bar {
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

The name attribute of the input tag. If not assigned it will be generated from
the field name.


### <a name="ng-model"></a> ng-model
*Default*: (form.objName).(field.name)
*Type*: `string`

The scoped variable where Angular will save the value of this field.

```
form {
  fields {
    /* this will be saved to data.foo */
    checkbox foo {}

    /* this will be saved to myvar */
    checkbox bar {
      ng-model = 'myvar'
    }
  }
}
```

