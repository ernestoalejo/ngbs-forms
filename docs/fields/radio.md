
Radio field
===========

It generates a radio buttons in the form.

 * [attrs](#attrs)
 * [class](#class)
 * [containerAttrs](#containerAttrs)
 * [id](#id)
 * [label](#label)
 * [name](#name)
 * [ng-model](#ng-model)
 * [options](#options)
 
### <a name="attrs"></a> attrs
*Default*: `{}`
*Type*: `Object`

Additional attributes for each one of the input tags..


### <a name="class"></a> class
*Default*: (empty)
*Type*: `string`

A space-separated list of additional CSS classes to add to each one of
the input tags.

```
form {
  fields {
    radio foo {
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

The prefix used for all input tags.

```
form {
  fields {
    /* this field will have all its options prefixed with "foo" */
    radio foo {}

    /* this field will have all its options prefixed with "foobarbaz" */
    radio bar {
      id = 'foobarbaz'
    }
  }
}
```


### <a name="label"></a> label
*Default*: (empty)
*Type*: `string`

Label for the whole field. It's completely independent for the labels for each
one of the options (specified in the `options` descriptor).


### <a name="name"></a> name
*Default*: (field.name)
*Type*: `string`

The name attribute of all the input tags. If not assigned it will be generated from
the field name.


### <a name="ng-model"></a> ng-model
*Default*: (form.objName).(field.name)
*Type*: `string`

The scoped variable where Angular will save the value of this field.

```
form {
  fields {
    /* this will be saved to data.foo */
    radio foo {}

    /* this will be saved to myvar */
    radio bar {
      ng-model = 'myvar'
    }
  }
}
```


### <a name="options"></a> options
*Default*: '{}'
*Type*: `Object`

List of static options for the radios.

```
form {
  fields {
    radio type {
      label = 'Label of the whole thing'
      
      options {
        particular = 'Particular User'
        company = 'Company User'
      }
    }
  }
}
```
