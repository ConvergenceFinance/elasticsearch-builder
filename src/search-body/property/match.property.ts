export default class MatchProperty {
    private key: string;
    private value: string | number | boolean;

    constructor(key: string, value: string | number | boolean) {
        this.key = key;
        this.value = value;
    }

    build(): any {
        return {
            match: {
                [this.key]: this.value
            }
        };
    }
}
