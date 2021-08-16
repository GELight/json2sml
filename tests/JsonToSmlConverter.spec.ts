import { JsonToSmlConverter } from "../src/json2sml/JsonToSmlConverter";

describe("JsonToSmlConverter", () => {

    it.each([
        [{}, ""]
    ])("JsonToSmlConverter(%p).convert() - returns %p",
        (json, expected) => {
            // when
            const converter = new JsonToSmlConverter();
            // then
            expect(converter.convert(json)).toBe(expected);
        });
});
