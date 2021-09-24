import { SmlDocument, SmlElement, SmlAttribute } from '@gelight/sml';
import JsonToSmlSettings from './JsonToSmlSettings';

export default class Converter {

    static convert(jsonObject: any): SmlDocument {
        const root: SmlElement = new SmlElement("SML");
        const doc: SmlDocument = new SmlDocument(root);
        
        const settings = new JsonToSmlSettings();

        if (settings.case === 1) {
            doc.setEndKeyword("end");
            root.name = "sml";
        } else if (settings.case === 2) {
            doc.setEndKeyword("END");
        }
        if (doc.getRoot().nodes.length === 1 && doc.getRoot().nodes[0] instanceof SmlElement) {
            doc.setRoot(doc.getRoot().nodes[0]);
        }

        Converter.convertObj(jsonObject, root, settings);

        return doc;
    }

    private static convertObj(jsonObject, smlElement: SmlElement, settings: JsonToSmlSettings): void {
        if (Converter.isValue(jsonObject)) {
            smlElement.add(new SmlAttribute("Value", [String(jsonObject)]));
        } else if (Converter.isSimpleArray(jsonObject)) {
            smlElement.addAttribute("Value", Converter.getSimpleArrayValues(jsonObject));
        } else if (Converter.isSimpleMatrix(jsonObject)) {
            smlElement.addAttribute("Value", Converter.getSimpleMatrixValues(jsonObject));
        } else if (Converter.isComplexArray(jsonObject)) {
            const itemName = Converter.getItemName(null);
            Converter.convertComplexArray(jsonObject, smlElement, itemName, settings);
        } else if (Converter.isObject(jsonObject)) {
            Converter.convertObjProperties(jsonObject, smlElement, settings);
        }
    }

    private static convertObjProperties(jsonObject, smlElement: SmlElement, settings: JsonToSmlSettings): void {
        const keys = Object.keys(jsonObject);
        for (const key of keys) {

            settings.scan(key);

            const value = jsonObject[key];
            
            if (Converter.isValue(value)) {
                smlElement.add(new SmlAttribute(key, [value]));
            } else if (Converter.isSimpleArray(value)) {
                smlElement.addAttribute(key, Converter.getSimpleArrayValues(value));
            } else if (Converter.isSimpleMatrix(value)) {
                smlElement.addAttribute(key, Converter.getSimpleMatrixValues(value));
            } else if (Converter.isComplexArray(value)) {
                const childSmlElement = smlElement.addElement(key);
                const itemName = Converter.getItemName(key);
                Converter.convertComplexArray(value, childSmlElement, itemName, settings);
            } else if (Converter.isObject(value)) {
                const childSmlElement = smlElement.addElement(key);
                Converter.convertObjProperties(value, childSmlElement, settings);
            }
        }
    }

    private static convertComplexArray(props: any[], smlElement: SmlElement, itemName: string, settings: JsonToSmlSettings): void {
        for (const property of props) {
            if (Converter.isValue(property)) {
                smlElement.add(new SmlAttribute(itemName, [property]));
            } else if (Converter.isSimpleArray(property)) {
                smlElement.addAttribute(itemName, Converter.getSimpleArrayValues(property));
            } else if (Converter.isSimpleMatrix(property)) {
                smlElement.addAttribute(itemName, Converter.getSimpleMatrixValues(property));
            } else {
                const childSmlElement = smlElement.addElement(itemName);
                Converter.convertObj(property, childSmlElement, settings);
            }
        }
    }

    private static replaceLast(name: string, length: number, pattern: string): string {
        return name.substring(0, name.length - length) + pattern;
    }

    private static getItemName(name: string): string {
        if (name != null && name.length > 0) {
            if (name.endsWith("IES")) return Converter.replaceLast(name, 3, "Y");
            if (name.endsWith("ies")) return Converter.replaceLast(name, 3, "y");
            if (name.endsWith("S")) return Converter.replaceLast(name, 1, "");
            if (name.endsWith("s")) return Converter.replaceLast(name, 1, "");
        }

        return "item";
    }

    private static getSimpleArrayValues(simpleArray: any[]): any[] {
        if (simpleArray.length === 0) {
            return [null];
        }

        return simpleArray.map(x => Converter.valueToString(x));
    }

    private static getSimpleMatrixValues(simpleArray: any[]): any[] {
        const result = [];
        for (const item of simpleArray) {
            if (Converter.isValue(item)) {
                result.push(Converter.valueToString(item));
            } else {
                const subValues = Converter.getSimpleArrayValues(item);
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
            if (!Converter.isValue(item)) {
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

    private static isComplexArray(jsonObject: any) {
        return Array.isArray(jsonObject) && !Converter.isSimpleArray(jsonObject);
    }

    private static isObject(jsonObject: any) {
        return jsonObject != null && !Array.isArray(jsonObject) && typeof (jsonObject) === "object";
    }

}
