import Converter from "./json2sml/Converter";

export {
    Converter
};

/*
const json = {
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

const smlDocument = Converter.convert(json);
// console.log(smlDocument);
console.log(smlDocument.toString());
*/
