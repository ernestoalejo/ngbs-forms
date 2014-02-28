
StaticNoWrap field
==================

Emit raw HTML code to the form. It has no descriptors nor name, only the raw
content. For example:

```
form {
  fields {
    /* fields not wrapped */
    input foo {}
    
    staticNoWrap {
      <div class="panel panel-default">
        <div class="panel-body">
    }

    /* fields wrapped inside a panel */
    input foo {}
    select bar {}

    staticNoWrap {
        </div>
      </div>
    }
  }
}
```
