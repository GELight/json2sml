"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sml_1 = require("@gelight/sml");
const JsonToSmlSettings_1 = __importDefault(require("./JsonToSmlSettings"));
class JsonToSmlConverter {
    static convert(jsonObject) {
        let root = new sml_1.SmlElement("SML");
        let doc = new sml_1.SmlDocument(root);
        let settings = new JsonToSmlSettings_1.default();
        if (settings.case === 1) {
            doc.setEndKeyword("end");
            root.name = "sml";
        }
        else if (settings.case === 2) {
            doc.setEndKeyword("END");
        }
        if (doc.getRoot().nodes.length === 1 && doc.getRoot().nodes[0] instanceof sml_1.SmlElement) {
            doc.setRoot(doc.getRoot().nodes[0]);
        }
        JsonToSmlConverter.convertObj(jsonObject, root, settings);
        return doc;
    }
    static convertObj(jsonObject, smlElement, settings) {
        if (JsonToSmlConverter.isValue(jsonObject)) {
            smlElement.add(new sml_1.SmlAttribute("Value", [String(jsonObject)]));
        }
        else if (JsonToSmlConverter.isSimpleArray(jsonObject)) {
            smlElement.addAttribute("Value", JsonToSmlConverter.getSimpleArrayValues(jsonObject));
        }
        else if (JsonToSmlConverter.isSimpleMatrix(jsonObject)) {
            smlElement.addAttribute("Value", JsonToSmlConverter.getSimpleMatrixValues(jsonObject));
        }
        else if (JsonToSmlConverter.isComplexArray(jsonObject)) {
            let itemName = JsonToSmlConverter.getItemName(null);
            JsonToSmlConverter.convertComplexArray(jsonObject, smlElement, itemName, settings);
        }
        else if (JsonToSmlConverter.isObject(jsonObject)) {
            JsonToSmlConverter.convertObjProperties(jsonObject, smlElement, settings);
        }
        else {
            smlElement.addString("...", "...");
        }
    }
    static convertObjProperties(jsonObject, smlElement, settings) {
        let keys = Object.keys(jsonObject);
        for (let key of keys) {
            settings.scan(key);
            let value = jsonObject[key];
            if (JsonToSmlConverter.isValue(value)) {
                smlElement.add(new sml_1.SmlAttribute(key, [value]));
            }
            else if (JsonToSmlConverter.isSimpleArray(value)) {
                smlElement.addAttribute(key, JsonToSmlConverter.getSimpleArrayValues(value));
            }
            else if (JsonToSmlConverter.isSimpleMatrix(value)) {
                smlElement.addAttribute(key, JsonToSmlConverter.getSimpleMatrixValues(value));
            }
            else if (JsonToSmlConverter.isComplexArray(value)) {
                let childSmlElement = smlElement.addElement(key);
                let itemName = JsonToSmlConverter.getItemName(key);
                JsonToSmlConverter.convertComplexArray(value, childSmlElement, itemName, settings);
            }
            else if (JsonToSmlConverter.isObject(value)) {
                let childSmlElement = smlElement.addElement(key);
                JsonToSmlConverter.convertObjProperties(value, childSmlElement, settings);
            }
            else {
                smlElement.addString("...", "...");
            }
        }
    }
    static convertComplexArray(props, smlElement, itemName, settings) {
        for (const property of props) {
            if (JsonToSmlConverter.isValue(property)) {
                smlElement.addString(itemName, property);
            }
            else if (JsonToSmlConverter.isSimpleArray(property)) {
                smlElement.addAttribute(itemName, JsonToSmlConverter.getSimpleArrayValues(property));
            }
            else if (JsonToSmlConverter.isSimpleMatrix(property)) {
                smlElement.addAttribute(itemName, JsonToSmlConverter.getSimpleMatrixValues(property));
            }
            else {
                let childSmlElement = smlElement.addElement(itemName);
                JsonToSmlConverter.convertObj(property, childSmlElement, settings);
            }
        }
    }
    static replaceLast(name, length, pattern) {
        return name.substring(0, name.length - length) + pattern;
    }
    static getItemName(name) {
        if (name != null && name.length > 0) {
            if (name.endsWith("IES"))
                return JsonToSmlConverter.replaceLast(name, 3, "Y");
            if (name.endsWith("ies"))
                return JsonToSmlConverter.replaceLast(name, 3, "y");
            if (name.endsWith("S"))
                return JsonToSmlConverter.replaceLast(name, 1, "");
            if (name.endsWith("s"))
                return JsonToSmlConverter.replaceLast(name, 1, "");
        }
        return "item";
    }
    static getSimpleArrayValues(simpleArray) {
        if (simpleArray.length === 0) {
            return [null];
        }
        return simpleArray.map(x => JsonToSmlConverter.valueToString(x));
    }
    static getSimpleMatrixValues(simpleArray) {
        let result = [];
        for (const item of simpleArray) {
            if (JsonToSmlConverter.isValue(item)) {
                result.push(JsonToSmlConverter.valueToString(item));
            }
            else {
                let subValues = JsonToSmlConverter.getSimpleArrayValues(item);
                result.push(...subValues);
            }
        }
        return result;
    }
    static valueToString(value) {
        if (value === null) {
            return null;
        }
        else {
            return String(value);
        }
    }
    static isValue(jsonObject) {
        return jsonObject === null ||
            typeof jsonObject === "number" ||
            typeof jsonObject === "string" ||
            typeof jsonObject === "boolean";
    }
    static isSimpleArray(jsonObject) {
        if (!Array.isArray(jsonObject)) {
            return false;
        }
        for (const item of jsonObject) {
            if (!JsonToSmlConverter.isValue(item)) {
                return false;
            }
        }
        return true;
    }
    static isSimpleMatrix(jsonObject) {
        if (!Array.isArray(jsonObject)) {
            return false;
        }
        for (const item of jsonObject) {
            if (!JsonToSmlConverter.isSimpleArray(item)) {
                return false;
            }
        }
        let firstLength = jsonObject[0].length;
        for (const item of jsonObject) {
            if (item.length !== firstLength) {
                return false;
            }
        }
        return true;
    }
    static isComplexArray(jsonObject) {
        return Array.isArray(jsonObject) && !JsonToSmlConverter.isSimpleArray(jsonObject);
    }
    static isObject(jsonObject) {
        return jsonObject != null && !Array.isArray(jsonObject) && typeof (jsonObject) === "object";
    }
}
exports.default = JsonToSmlConverter;
//# sourceMappingURL=JsonToSmlConverter.js.map