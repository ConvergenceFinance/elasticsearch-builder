export type ESQueryString = {
    query: string;
    fields?: Array<string>;
    type?: "best_fields" | "bool_prefix" | "cross_fields" | "most_fields" | "phrase" | "phrase_prefix";
    tie_breaker?: number;
};

export default class QueryStringProperty {
    private queryString: ESQueryString;
    constructor(queryString: ESQueryString) {
        this.queryString = queryString;
    }

    public build(): any {
        if (Object.keys(this.queryString).length === 0) {
            throw new Error("range() Error: You must specify gt/gte/lt/lte.");
        }

        return {
            query_string: this.queryString
        };
    }
}
