import JsonToSmlConverter from "./json2sml/JsonToSmlConverter";

export {
    JsonToSmlConverter
};

/*
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
*/
