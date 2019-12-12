
export default class SumAggType {
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
