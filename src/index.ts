import JsonToSmlConverter from "./json2sml/JsonToSmlConverter";

export {
    JsonToSmlConverter
};

let jsonExample = {
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

const json = {
    "firstName": "John"
}

let doc = JsonToSmlConverter.convert(json);
let root = doc.getRoot();

console.log(root.attribute("lastName").getValues()[0]);
