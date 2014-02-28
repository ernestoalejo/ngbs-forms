
Select field
============

It generates a `<select>` tag in the form.

 * [attrs](#attrs)
 * [class](#class)
 * [containerAttrs](#containerAttrs)
 * [id](#id)
 * [label](#label)
 * [name](#name)
 * [ng-model](#ng-model)
 * [ng-options](#ng-options)
 * [ngRepeatOptions](#ngRepeatOptions)
 * [options](#options)


### <a name="attrs"></a> attrs
*Default*: `{}`
*Type*: `Object`

Additional attributes for the select tag.


### <a name="class"></a> class
*Default*: (empty)
*Type*: `string`

A space-separated list of additional CSS classes to add to the select tag.

```
form {
  fields {
    select foo {
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

The ID attribute of the select tag. If not assigned it will be generated from
the field name.

```
form {
  fields {
    /* this select will have an id "foo" */
    select foo {}

    /* this select will have an id "foobarbaz" */
    select bar {
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

The name attribute of the select tag. If not assigned it will be generated from
the field name.


### <a name="ng-model"></a> ng-model
*Default*: (form.objName).(field.name)
*Type*: `string`

The scoped variable where Angular will save the value of this field.

```
form {
  fields {
    /* this will be saved to data.foo */
    select foo {}

    /* this will be saved to myvar */
    select bar {
      ng-model = 'myvar'
    }
  }
}
```


### <a name="ng-options"></a> ng-options
*Default*: (empty)
*Type*: `string`

Fills the `ng-options` attribute in the select tag.

```
form {
  fields {
    select foo {
      ng-options = 'item in list'
    }
  }
}
```


### <a name="ngRepeatOptions"></a> ngRepeatOptions
*Default*: '{}'
*Type*: `Object`

Build the select option using a `ng-repeat` over a `option` tag. Useful for
interaction with plugins like Select2 that need it.

The object should have 3 keys:

 * **repeat**: The `ng-repeat` text.
 * **value**: The expression to evaluate for the `value` attribute.
 * **label**: The expression to evaluate for the label of the option.

For example this form:

```
form {
  fields {
    select foo {
      ngRepeatOptions {
        repeat = 'item in list'
        value = '{{ item.value }}'
        label = 'My {{ item.label }}'
      }
    }
  }
}
```

will generate some HTML like this:

```html
<select ...more attribs here...>
  <option ng-repeat="item in list" value="{{ item.value }}">My {{ item.label }}</option>
</select>
```

It can also be combined with the `options` descriptor to make additional options.

```
form {
  fields {
    select foo {
      ngRepeatOptions {
        repeat = 'item in list'
        value = '{{ item.value }}'
        label = '{{ item.value }}'
      }

      options {
        foo = 'Another great option'
        bar = 'A not so great option'
      }
    }
  }
}
```


### <a name="options"></a> options
*Default*: '{}'
*Type*: `Object`

List of static options for the select.

```
form {
  fields {
    select type {
      options {
        particular = 'Particular User'
        company = 'Company User'
      }
    }
  }
}
```
