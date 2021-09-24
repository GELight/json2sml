"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sml_1 = require("@gelight/sml");
const JsonToSmlSettings_1 = __importDefault(require("./JsonToSmlSettings"));
class Converter {
    static convert(jsonObject) {
        const root = new sml_1.SmlElement("SML");
        const doc = new sml_1.SmlDocument(root);
        const settings = new JsonToSmlSettings_1.default();
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
        Converter.convertObj(jsonObject, root, settings);
        return doc;
    }
    static convertObj(jsonObject, smlElement, settings) {
        if (Converter.isValue(jsonObject)) {
            smlElement.add(new sml_1.SmlAttribute("Value", [String(jsonObject)]));
        }
        else if (Converter.isSimpleArray(jsonObject)) {
            smlElement.addAttribute("Value", Converter.getSimpleArrayValues(jsonObject));
        }
        else if (Converter.isSimpleMatrix(jsonObject)) {
            smlElement.addAttribute("Value", Converter.getSimpleMatrixValues(jsonObject));
        }
        else if (Converter.isComplexArray(jsonObject)) {
            const itemName = Converter.getItemName(null);
            Converter.convertComplexArray(jsonObject, smlElement, itemName, settings);
        }
        else if (Converter.isObject(jsonObject)) {
            Converter.convertObjProperties(jsonObject, smlElement, settings);
        }
    }
    static convertObjProperties(jsonObject, smlElement, settings) {
        const keys = Object.keys(jsonObject);
        for (const key of keys) {
            settings.scan(key);
            const value = jsonObject[key];
            if (Converter.isValue(value)) {
                smlElement.add(new sml_1.SmlAttribute(key, [value]));
            }
            else if (Converter.isSimpleArray(value)) {
                smlElement.addAttribute(key, Converter.getSimpleArrayValues(value));
            }
            else if (Converter.isSimpleMatrix(value)) {
                smlElement.addAttribute(key, Converter.getSimpleMatrixValues(value));
            }
            else if (Converter.isComplexArray(value)) {
                const childSmlElement = smlElement.addElement(key);
                const itemName = Converter.getItemName(key);
                Converter.convertComplexArray(value, childSmlElement, itemName, settings);
            }
            else if (Converter.isObject(value)) {
                const childSmlElement = smlElement.addElement(key);
                Converter.convertObjProperties(value, childSmlElement, settings);
            }
        }
    }
    static convertComplexArray(props, smlElement, itemName, settings) {
        for (const property of props) {
            if (Converter.isValue(property)) {
                smlElement.add(new sml_1.SmlAttribute(itemName, [property]));
            }
            else if (Converter.isSimpleArray(property)) {
                smlElement.addAttribute(itemName, Converter.getSimpleArrayValues(property));
            }
            else if (Converter.isSimpleMatrix(property)) {
                smlElement.addAttribute(itemName, Converter.getSimpleMatrixValues(property));
            }
            else {
                const childSmlElement = smlElement.addElement(itemName);
                Converter.convertObj(property, childSmlElement, settings);
            }
        }
    }
    static replaceLast(name, length, pattern) {
        return name.substring(0, name.length - length) + pattern;
    }
    static getItemName(name) {
        if (name != null && name.length > 0) {
            if (name.endsWith("IES"))
                return Converter.replaceLast(name, 3, "Y");
            if (name.endsWith("ies"))
                return Converter.replaceLast(name, 3, "y");
            if (name.endsWith("S"))
                return Converter.replaceLast(name, 1, "");
            if (name.endsWith("s"))
                return Converter.replaceLast(name, 1, "");
        }
        return "item";
    }
    static getSimpleArrayValues(simpleArray) {
        if (simpleArray.length === 0) {
            return [null];
        }
        return simpleArray.map(x => Converter.valueToString(x));
    }
    static getSimpleMatrixValues(simpleArray) {
        const result = [];
        for (const item of simpleArray) {
            if (Converter.isValue(item)) {
                result.push(Converter.valueToString(item));
            }
            else {
                const subValues = Converter.getSimpleArrayValues(item);
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
            if (!Converter.isValue(item)) {
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
            if (!Converter.isSimpleArray(item)) {
                return false;
            }
        }
        const firstLength = jsonObject[0].length;
        for (const item of jsonObject) {
            if (item.length !== firstLength) {
                return false;
            }
        }
        return true;
    }
    static isComplexArray(jsonObject) {
        return Array.isArray(jsonObject) && !Converter.isSimpleArray(jsonObject);
    }
    static isObject(jsonObject) {
        return jsonObject != null && !Array.isArray(jsonObject) && typeof (jsonObject) === "object";
    }
}
exports.default = Converter;
//# sourceMappingURL=Converter.js.map