
export default class NestedAggType {
    private path: string;

    constructor(path: string) {
        this.path = path;
    }
    public build() {
        const nested: any = {
            path: this.path
        };
        return {
            nested
        };
    }
}
