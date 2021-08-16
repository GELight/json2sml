import { SmlDocument, SmlElement, SmlAttribute } from '@gelight/sml';
import JsonToSmlSettings from './JsonToSmlSettings';

export default class JsonToSmlConverter {

    static convert(jsonObject: object): SmlDocument {
        let root: SmlElement = new SmlElement("SML");
        let doc: SmlDocument = new SmlDocument(root);
        
        let settings = new JsonToSmlSettings();

        if (settings.case === 1) {
            doc.setEndKeyword("end");
            root.name = "sml";
        } else if (settings.case === 2) {
            doc.setEndKeyword("END");
        }
        if (doc.getRoot().nodes.length === 1 && doc.getRoot().nodes[0] instanceof SmlElement) {
            doc.setRoot(doc.getRoot().nodes[0]);
        }

        JsonToSmlConverter.convertObj(jsonObject, root, settings);

        return doc;
    }

    private static convertObj(jsonObject, smlElement: SmlElement, settings: JsonToSmlSettings): void {
        if (JsonToSmlConverter.isValue(jsonObject)) {
            smlElement.add(new SmlAttribute("Value", [String(jsonObject)]));
        } else if (JsonToSmlConverter.isSimpleArray(jsonObject)) {
            smlElement.addAttribute("Value", JsonToSmlConverter.getSimpleArrayValues(jsonObject));
        } else if (JsonToSmlConverter.isSimpleMatrix(jsonObject)) {
            smlElement.addAttribute("Value", JsonToSmlConverter.getSimpleMatrixValues(jsonObject));
        } else if (JsonToSmlConverter.isComplexArray(jsonObject)) {
            let itemName = JsonToSmlConverter.getItemName(null);
            JsonToSmlConverter.convertComplexArray(jsonObject, smlElement, itemName, settings);
        } else if (JsonToSmlConverter.isObject(jsonObject)) {
            JsonToSmlConverter.convertObjProperties(jsonObject, smlElement, settings);
        } else {
            smlElement.addString("...", "...");
        }
    }

    private static convertObjProperties(jsonObject, smlElement: SmlElement, settings: JsonToSmlSettings): void {
        let keys = Object.keys(jsonObject);
        for (let key of keys) {

            settings.scan(key);

            let value = jsonObject[key];
            
            if (JsonToSmlConverter.isValue(value)) {
                smlElement.add(new SmlAttribute(key, [value]));
            } else if (JsonToSmlConverter.isSimpleArray(value)) {
                smlElement.addAttribute(key, JsonToSmlConverter.getSimpleArrayValues(value));
            } else if (JsonToSmlConverter.isSimpleMatrix(value)) {
                smlElement.addAttribute(key, JsonToSmlConverter.getSimpleMatrixValues(value));
            } else if (JsonToSmlConverter.isComplexArray(value)) {
                let childSmlElement = smlElement.addElement(key);
                let itemName = JsonToSmlConverter.getItemName(key);
                JsonToSmlConverter.convertComplexArray(value, childSmlElement, itemName, settings);
            } else if (JsonToSmlConverter.isObject(value)) {
                let childSmlElement = smlElement.addElement(key);
                JsonToSmlConverter.convertObjProperties(value, childSmlElement, settings);
            } else {
                smlElement.addString("...", "...");
            }
        }
    }

    private static convertComplexArray(props: any[], smlElement: SmlElement, itemName: string, settings: JsonToSmlSettings): void {
        for (const property of props) {
            if (JsonToSmlConverter.isValue(property)) {
                smlElement.addString(itemName, property);
            } else if (JsonToSmlConverter.isSimpleArray(property)) {
                smlElement.addAttribute(itemName, JsonToSmlConverter.getSimpleArrayValues(property));
            } else if (JsonToSmlConverter.isSimpleMatrix(property)) {
                smlElement.addAttribute(itemName, JsonToSmlConverter.getSimpleMatrixValues(property));
            } else {
                let childSmlElement = smlElement.addElement(itemName);
                JsonToSmlConverter.convertObj(property, childSmlElement, settings);
            }
        }
    }

    private static replaceLast(name: string, length: number, pattern: string): string {
        return name.substring(0, name.length - length) + pattern;
    }

    private static getItemName(name: string): string {
        if (name != null && name.length > 0) {
            if (name.endsWith("IES")) return JsonToSmlConverter.replaceLast(name, 3, "Y");
            if (name.endsWith("ies")) return JsonToSmlConverter.replaceLast(name, 3, "y");
            if (name.endsWith("S")) return JsonToSmlConverter.replaceLast(name, 1, "");
            if (name.endsWith("s")) return JsonToSmlConverter.replaceLast(name, 1, "");
        }

        return "item";
    }

    private static getSimpleArrayValues(simpleArray: any[]): any[] {
        if (simpleArray.length === 0) {
            return [null];
        }

        return simpleArray.map(x => JsonToSmlConverter.valueToString(x));
    }

    private static getSimpleMatrixValues(simpleArray: any[]): any[] {
        let result = [];
        for (const item of simpleArray) {
            if (JsonToSmlConverter.isValue(item)) {
                result.push(JsonToSmlConverter.valueToString(item));
            } else {
                let subValues = JsonToSmlConverter.getSimpleArrayValues(item);
                result.push(...subValues);
            }
        }

        return result;
    }

    private static valueToString(value: string | null) {
        if (value === null) {
            return null;
        } else {
            return String(value);
        }
    }

    private static isValue(jsonObject: any): boolean {
        return jsonObject === null ||
            typeof jsonObject === "number" ||
            typeof jsonObject === "string" ||
            typeof jsonObject === "boolean";
    }

    private static isSimpleArray(jsonObject: any): boolean {
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

    private static isSimpleMatrix(jsonObject: any): boolean {
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

    private static isComplexArray(jsonObject: any) {
        return Array.isArray(jsonObject) && !JsonToSmlConverter.isSimpleArray(jsonObject);
    }

    private static isObject(jsonObject: any) {
        return jsonObject != null && !Array.isArray(jsonObject) && typeof (jsonObject) === "object";
    }

}
