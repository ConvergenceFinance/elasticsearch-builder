import RangeAggType from "./range.agg.type";

describe("Range Agg Type", () => {
    it("Should return a valid RangeAggType object.", () => {
        expect.assertions(1);
        const rangeAggType = new RangeAggType("test", []);

        expect(rangeAggType).toBeInstanceOf(RangeAggType);
    });

    it("Should return a valid RangeAggType object with ranges using method.", () => {
        expect.assertions(1);
        const rangeAggType = new RangeAggType(
            "test", 
            (rangeAggType) => rangeAggType
                .range("1", 0, 10)
                .range("2", 10)
        );

        const expected = {
            range: {
                field: "test",
                ranges: [
                    { key: "1", from: 0, to: 10 },
                    { key: "2", from: 10 }
                ]
            }
        };

        expect(rangeAggType.build()).toStrictEqual(expected);
    });

    it("Should return a valid RangeAggType object with ranges using an array.", () => {
        expect.assertions(1);
        const rangeAggType = new RangeAggType("test", [
            { key: "1", from: 0, to: 10}, 
            { key: "2", from: 10 }
        ]);

        const expected = {
            range: {
                field: "test",
                ranges: [
                    { key: "1", from: 0, to: 10 },
                    { key: "2", from: 10 }
                ]
            }
        };

        expect(rangeAggType.build()).toStrictEqual(expected);
    });
});