import { ESAggTypes } from "../../..";

export default class AvgAggType implements ESAggTypes {
    private field: string;

    constructor(
        field: string,
    ) {
        this.field = field;
    }

    public build() {
        const avg: any = {};
        if (this.field !== null) {
            avg.field = this.field;
        }
        return {
            avg
        };
    }
}
