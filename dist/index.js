"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonToSmlConverter = void 0;
const JsonToSmlConverter_1 = __importDefault(require("./json2sml/JsonToSmlConverter"));
exports.JsonToSmlConverter = JsonToSmlConverter_1.default;
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
};
let doc = JsonToSmlConverter_1.default.convert(json);
let root = doc.getRoot();
let city = root.getElement("address").getAttribute("city").getValues()[0];
console.log(city);
//# sourceMappingURL=index.js.map