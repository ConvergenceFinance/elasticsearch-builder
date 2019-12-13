import { ESAggTypes } from "../../..";

export interface ElasticSearchRange {
    key?: string,
    from?: number,
    to?: number,
}

export type RangeMethod = (rangeAggType: RangeAggType) => void;

export default class RangeAggType implements ESAggTypes {
    private field: string;
    private ranges: Array<ElasticSearchRange> = [];

    constructor(field: string, ranges: Array<ElasticSearchRange> | RangeMethod) {
        this.field = field;
        if (Array.isArray(ranges)) {
            this.ranges = ranges;
        } else {
            ranges(this);
        }
    }
    
    range(key?: string, from?: number, to?: number) {
        const range: any = {};

        if (typeof key !== "undefined") {
            range.key = key;
        }

        if (typeof from !== "undefined") {
            range.from = from;
        }

        if (typeof to !== "undefined") {
            range.to = to;
        }

        this.ranges?.push(range);
        return this;
    }

    public build() {
        const range: any = {};
        range.field = this.field;
        range.ranges = this.ranges
        return {
            range
        };
    }
}
