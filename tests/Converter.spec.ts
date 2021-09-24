import Converter from "../src/json2sml/Converter";

describe("Converter", () => {

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
    
    it("All possible json structures are tested", () => {
        // when
        const doc = Converter.convert(json);
        // then
        expect(doc.getRoot().getAttribute("firstName").getValues()[0]).toBe("John");
        expect(doc.getRoot().getAttribute("lastName").getValues()[0]).toBe("Smith");
        expect(doc.getRoot().getAttribute("isAlive").getValues()[0]).toBe("true");
        expect(doc.getRoot().getAttribute("age").getValues()[0]).toBe("27");

        expect(doc.getRoot().hasElement("address")).toBe(true);
        expect(doc.getRoot().getElement("address").getAttributes().length).toBe(4);
        expect(doc.getRoot().getElement("address").getAttribute("streetAddress").getValues()[0]).toBe("21 2nd Street");
        expect(doc.getRoot().getElement("address").getAttribute("city").getValues()[0]).toBe("New York");
        expect(doc.getRoot().getElement("address").getAttribute("state").getValues()[0]).toBe("NY");
        expect(doc.getRoot().getElement("address").getAttribute("postalCode").getValues()[0]).toBe("10021-3100");

        expect(doc.getRoot().getElement("phoneNumbers").getElements()[0].getAttribute("type").getValues()[0]).toBe("home");
        expect(doc.getRoot().getElement("phoneNumbers").getElements()[0].getAttribute("number").getValues()[0]).toBe("212 555-1234");
        expect(doc.getRoot().getElement("phoneNumbers").getElements()[1].getAttribute("type").getValues()[0]).toBe("office");
        expect(doc.getRoot().getElement("phoneNumbers").getElements()[1].getAttribute("number").getValues()[0]).toBe("646 555-4567");
        
        expect(doc.getRoot().getAttribute("aNullValue").getValues()[0]).toBe("null");
        
        expect(doc.getRoot().getAttribute("children").getValues()[0]).toBe("Aaron");
        expect(doc.getRoot().getAttribute("spouse").getValues()[0]).toBe("true");
    });

});
