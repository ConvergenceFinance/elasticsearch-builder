import { ESAggTypes } from "../../..";

export default class SumAggType implements ESAggTypes {
    private field: string;

    constructor(
        field: string,
    ) {
        this.field = field;
    }

    public build() {
        const sum: any = {};
        if (this.field !== null) {
            sum.field = this.field;
        }
        return {
            sum
        };
    }
}
