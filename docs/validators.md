
Validators reference
====================

 * [custom](#custom)
 * [date](#date)
 * [email](#email)
 * [integer](#integer)
 * [match](#match)
 * [maxdate](#maxdate)
 * [maxlength](#maxlength)
 * [maxvalue](#maxvalue)
 * [mindate](#mindate)
 * [minlength](#minlength)
 * [minvalue](#minvalue)
 * [positive](#positive)
 * [regexp](#regexp)
 * [required](#required)
 * [url](#url)


### <a name="custom"></a> custom
*Applies to*: `input`, `select`, `textarea`.
*Args*: `code (string)`.

Additional boolean conditions **manually toggled** in the controller that returns
`true` when the field content is invalid and `false` when it is correct.


### <a name="date"></a> date
*Applies to*: `input`.
*Args*: (no args).

Performs date validations over the input contents.

**NOTE:** It requires that you have a directive in your app that you manually
bootstrap using `attrs` (adding a custom attribute for your directive). This
validator will only add a message that will be triggered when an error called
`date` it's active.

For example if you use the datepicker from Angular Bootstrap UI you'll have a form
like this:

```
form {
  fields {
    input enddate {
      label = 'End Date'
      placeholder = 'DD/MM/AAAA'

      attrs {
        datepicker-popup = 'dd/MM/yyyy'
        datepicker-options = 'datepickerOptions'
      }

      validators {
        required = 'The end date is required'
        date = 'The end date should have a valid DD/MM/YYYY format'
      }
    }
  }
}
```


### <a name="email"></a> email
*Applies to*: `input`.
*Args*: (no args).

Checks the input field to see if it's a correctly formatted email address.


### <a name="integer"></a> integer
*Applies to*: `input`.
*Args*: (no args).

Shows an error if the input it's not numeric.

**NOTE:** You'll need to put the type of the input to `number` for Angular to
validate it corrrectly.

```
form {
  fields {
    input foo {
      type = 'number'

      validators {
        integer = 'An integer value is required'
      }
    }
  }
}
```


### <a name="match"></a> match
*Applies to*: `input`.
*Args*: `field name (string)`.

Checks if a field matches exactly another one.

**NOTE:** You'll need your own directive called `match`. See `directives/match.js`
for an example of that code.


### <a name="maxdate"></a> maxdate
*Applies to*: `input`.
*Args*: `max date (string)`.

Specifies a maximum date. The format of `max date` depends on your directive.

**NOTE:** You'll need your own directive called `maxDateValue`. See
`directives/maxdate.js` for an example of that code.


### <a name="maxlength"></a> maxlength
*Applies to*: `input`.
*Args*: `max length (integer)`.

Specifies a minimum number of characters (inclusive) the input should have to be valid.


### <a name="maxvalue"></a> maxvalue
*Applies to*: `input`.
*Args*: `max value (integer)`.

Specifies a maximum (inclusive) for the integer value of the field.

**NOTE:** It needs an input of type `number` to work (see [integer](#integer)
for an example).


### <a name="mindate"></a> mindate
*Applies to*: `input`.
*Args*: `min date (string)`.

Specifies a minimum date. The format of `min date` depends on your directive.

**NOTE:** You'll need your own directive called `minDateValue`. See
`directives/mindate.js` for an example of that code.


### <a name="minlength"></a> minlength
*Applies to*: `input`.
*Args*: `max length (integer)`.

Specifies a minimum number of characters (inclusive) the input should have to be valid.


### <a name="minvalue"></a> minvalue
*Applies to*: `input`.
*Args*: `min value (integer)`.

Specifies a minimum (inclusive) for the integer value of the field.

**NOTE:** It needs an input of type `number` to work (see [integer](#integer)
for an example).

**NOTE:** You can't use zero as the minimum, it won't work. Use the
[positive](#positive) validator, it's equivalent.


### <a name="positive"></a> positive
*Applies to*: `input`.
*Args*: (no args).

Requires a positive integer.

**NOTE:** Requires an input of type `number` to work (see [integer](#integer)
for an example).


 * [regexp](#regexp)
 * [required](#required)
 * [url](#url)

