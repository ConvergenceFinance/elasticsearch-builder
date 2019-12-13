import ReverseNestedAggType from "./reverse-nested.agg.type";

describe("Reverse Nested Agg Type", () => {
    it("Should return a valid ReverseNestedAggType object.", () => {
        expect.assertions(1);
        const reverseNestedAggType = new ReverseNestedAggType();

        expect(reverseNestedAggType).toBeInstanceOf(ReverseNestedAggType);
    });

    it("Should return a valid ReverseNestedAggType object with a valid build output", () => {
        expect.assertions(1);
        const reverseNestedAggType = new ReverseNestedAggType();

        const expected = {
            reverse_nested: {}
        };

        expect(reverseNestedAggType.build()).toStrictEqual(expected);
    });
});