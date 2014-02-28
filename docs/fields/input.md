
Input field
===========

It generates a `<input>` tag in the form (except checkboxes and radios, there's
another kind of fields for that).

 * [attrs](#attrs)
 * [class](#class)
 * [containerAttrs](#containerAttrs)
 * [id](#id)
 * [label](#label)
 * [name](#name)
 * [ng-model](#ng-model)
 * [placeholder](#placeholder)
 * [prefix](#prefix)
 * [suffix](#suffix)
 * [type](#type)


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
    input foo {
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
    /* this input will have an id "foo" */
    input foo {}

    /* this input will have an id "foobarbaz" */
    input bar {
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
    input foo {}

    /* this will be saved to myvar */
    input bar {
      ng-model = 'myvar'
    }
  }
}
```


### <a name="placeholder"></a> placeholder
*Default*: (empty)
*Type*: `string`

The placeholder for the input tag. It will be always emitted on the code so it's
recommended to have a placeholder in all cases.


### <a name="prefix"></a> prefix
*Default*: (empty)
*Type*: `string`

If present the input will be prefixed. It can be anything, including Angular templates.
See [suffix](#suffix) for the example.


### <a name="suffix"></a> suffix
*Default*: (empty)
*Type*: `string`

If present the input will be suffixed. It can be anything, including Angular templates.

```
form {
  fields {
    input myurl {
      prefix = 'http://'
    }

    input price {
      suffix = '€'
    }

    input withtemplates {
      prefix = '{{ protocol }}'
      suffix = '{{ currency }}'
    }
  }
}
```


### <a name="type"></a> type
*Default*: `text`
*Type*: `string`

The HTML5 type of this input.

```
form {
  fields {
    input email {
      type = 'email'
    }
  }
}
```
