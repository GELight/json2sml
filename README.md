# @gelight/json2sml

Node package to convert JSON to SML

## Dependencies

This library depends on SML (Simple Markup Language)

## What is SML?

> [Video - Using SML in PHP](https://dev.stenway.com/SML/PHP.html)

> [Guide - SML Specification](https://dev.stenway.com/SML/Specification.html)

> [Video - SML in 60sec](https://www.youtube.com/watch?v=qOooyygwX0w)

> [Video - SML Explained](https://www.youtube.com/watch?v=fBzMdzMtH-s&t=221s)

## Using

```js
import JsonToSmlConverter from "@gelight/json2sml";

let json = {
    "firstName": "John",
    "lastName": "Smith",
    "isAlive": true,
    "age": 27,
    "address": {
        "streetAddress": "21 2nd Street",
        "city": "New York",
        "state": "NY",
        "postalCode": "10021-3100"
    },
    "aNullValue": null,
    "phoneNumbers": [
        {
            "type": "home",
            "number": "212 555-1234"
        },
        {
            "type": "office",
            "number": "646 555-4567"
        }
    ],
    "children": [
        "Aaron"
    ],
    "spouse": true
}

let doc = JsonToSmlConverter.convert(json);
let root = doc.getRoot();

let city = root.getElement("address").getAttribute("city").getValues()[0];
console.log(city);
```

Output:
```html
New York
```
