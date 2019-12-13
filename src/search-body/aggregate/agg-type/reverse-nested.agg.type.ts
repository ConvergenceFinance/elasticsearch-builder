import { ESAggTypes } from "../../..";

export default class ReverseNestedAggType implements ESAggTypes {
    constructor() {}

    public build() {
        const reverse_nested: any = {};
        return {
            reverse_nested
        };
    }
}
