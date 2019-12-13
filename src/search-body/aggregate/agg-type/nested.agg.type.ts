import { ESAggTypes } from "../../..";

export default class NestedAggType implements ESAggTypes {
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
