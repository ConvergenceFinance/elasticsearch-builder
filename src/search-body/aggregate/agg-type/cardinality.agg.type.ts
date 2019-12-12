
export default class CardinalityAggType {
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
