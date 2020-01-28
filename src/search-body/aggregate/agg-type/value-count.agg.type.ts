import { ESAggTypes } from "../../..";

export default class ValueCountAggType implements ESAggTypes {
    private field: string;

    constructor(
        field: string,
    ) {
        this.field = field;
    }

    public build() {
        const value_count: any = {};
        if (this.field !== null) {
            value_count.field = this.field;
        }
        return {
            value_count
        };
    }
}
