import BucketSortAggType from "./bucket-sort.agg.type";

describe("Bucket Sort Agg Type", () => {
    it("Should return a valid BucketSortAggType object.", () => {
        expect.assertions(1);
        const bucketSortAggType = new BucketSortAggType();

        expect(bucketSortAggType).toBeInstanceOf(BucketSortAggType);
    });

    it("Should return a valid BucketSortAggType object with ranges using method.", () => {
        expect.assertions(1);
        const bucketSortAggType = new BucketSortAggType(
            (bucketSort) => bucketSort
                .field("test", "asc")
                .field("test2"),
            1,
            10,
            "skip"
        );

        const expected = {
            bucket_sort: {
                sort: [
                    {
                        test: {
                            order: "asc"
                        }
                    },
                    "test2"
                ],
                from: 1,
                size: 10,
                gap_policy: "skip"
            }
        };

        expect(bucketSortAggType.build()).toStrictEqual(expected);
    })
});