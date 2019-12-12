export default class ExistsProperty {
    private field: string;

    constructor(field: string) {
        this.field = field;
    }

    build(): any {
        return {
            exists: {
                "field": this.field
            }
        };
    }
}
