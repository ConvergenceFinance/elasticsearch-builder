import { ESAggTypes } from "../../..";

export default class BucketSortAggType implements ESAggTypes {
    private from: number | null = null;
    private size: number | null = null;
    private gapPolicy: string | null = null;
    private sortFields: Array<{field: string, order?: "desc" | "asc"}> = [];

    constructor(builder?: (bucketSortAggType: BucketSortAggType) => void, from: number | null = null, size: number | null = null, gapPolicy: string | null = null) {
        this.from = from;
        this.size = size;
        this.gapPolicy = gapPolicy;
        if (typeof builder !== "undefined") {
            builder(this);
        }
    }

    field(field: string, order?: "desc" | "asc") {
        const sortField: any = {
            field
        };
        if (typeof order !== "undefined") {
            sortField.order = order;
        }
        this.sortFields.push(sortField);
        return this;
    }

    public build() {
        const bucket_sort: any = {};
        if (this.from !== null) {
            bucket_sort.from = this.from;
        }
        if (this.size !== null) {
            bucket_sort.size = this.size;
        }
        if (this.gapPolicy !== null) {
            bucket_sort.gap_policy = this.gapPolicy;
        }
        if (this.sortFields.length > 0) {
            bucket_sort.sort = this.sortFields.map((bucket) => {
                if (typeof bucket.order !== "undefined") {
                    return {
                        [bucket.field]: {
                            order: bucket.order
                        }
                    }
                }

                return bucket.field
            });
        }
        return {
            bucket_sort
        };
    }
}
