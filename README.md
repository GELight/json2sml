# @gelight/json2sml

Node package to convert JSON to SML

## Dependencies

This library depends on SML (Simple Markup Language)

## What is SML?

> [Guide - SML Specification](https://dev.stenway.com/SML/Specification.html)

> [Video - SML in 60sec](https://www.youtube.com/watch?v=qOooyygwX0w)

> [Video - SML Explained](https://www.youtube.com/watch?v=fBzMdzMtH-s&t=221s)

## Using in Node.js

```js
// Import the converter class from the module
import { Converter } from "@gelight/json2sml";

// JSON example
let json = {
    "firstName": "John",
    "lastName": "Smith",
    "age": 27,
    "address": {
        "streetAddress": "21 2nd Street",
        "city": "New York",
        "state": "NY",
        "postalCode": "10021-3100"
    }
}

// Use the converter to generate your SML document based on your JSON object
let doc = Converter.convert(json);

// Output > Logs all SML attributes from the SML element "address"
console.log(doc.getRoot().getElement("address").getAttributes());
```

Output:
```js
[
  SmlAttribute {
    whitespaces: null,
    comment: null,
    name: 'streetAddress',
    values: [ '21 2nd Street' ]
  },
  SmlAttribute {
    whitespaces: null,
    comment: null,
    name: 'city',
    values: [ 'New York' ]
  },
  SmlAttribute {
    whitespaces: null,
    comment: null,
    name: 'state',
    values: [ 'NY' ]
  },
  SmlAttribute {
    whitespaces: null,
    comment: null,
    name: 'postalCode',
    values: [ '10021-3100' ]
  }
]
```

## Using in browser

```html
<html>
    <head>
        <title>JSON2SML - Node package to convert JSON to SML</title>
    </head>
    <body>
        <script src="https://unpkg.com/@gelight/json2sml"></script>
        <script>
          let json = {
              "firstName": "John",
              "lastName": "Smith",
              "age": 27,
              "address": {
                  "streetAddress": "21 2nd Street",
                  "city": "New York",
                  "state": "NY",
                  "postalCode": "10021-3100"
              }
          };
          
          let doc = JSON2SML.Converter.convert(json);
          
          console.log(doc.getRoot().getElement("address").getAttributes());
          
        </script>
    </body>
</html>
```
