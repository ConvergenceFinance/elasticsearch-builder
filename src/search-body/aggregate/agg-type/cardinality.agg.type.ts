import { ESAggTypes } from "../../..";

export default class CardinalityAggType implements ESAggTypes {
    private field: string;

    constructor(
        field: string
    ) {
        this.field = field;
    }

    public build() {
        const cardinality: any = {
            field: this.field
        };
        return {
            cardinality
        };
    }
}
