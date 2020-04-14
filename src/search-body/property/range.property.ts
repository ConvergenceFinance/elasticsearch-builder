export type ESRanges = {
    gt?: number | string;
    gte?: number | string;
    lt?: number | string;
    lte?: number | string;
    format?: string;
    relation?: "INTERSECTS" | "CONTAINS" | "WITHIN",
    time_zone?: string;
    boost?: number;
};

export default class RangeProperty {
    private ranges: ESRanges;
    private key: string;

    constructor(key: string, ranges: ESRanges) {
        this.key = key;
        this.ranges = ranges;
    }

    public build(): any {
        if (Object.keys(this.ranges).length === 0) {
            throw new Error("range() Error: You must specify gt/gte/lt/lte.");
        }

        return {
            range: {
                [this.key]: this.ranges
            }
        };
    }
}
