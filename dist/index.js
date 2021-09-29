"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = void 0;
const Converter_1 = __importDefault(require("./json2sml/Converter"));
exports.Converter = Converter_1.default;
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

// Use the converter to generate your SML document based on your JSON object
const doc = Converter.convert(json);

// Output > Logs all SML attributes from the SML element "address"
console.log(doc.getRoot().getElement("address").getAttributes());
*/ 
//# sourceMappingURL=index.js.map