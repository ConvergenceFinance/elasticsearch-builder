export type ESQueryString = {
    query: string;
    fields?: Array<string>;
    type?: "best_fields" | "bool_prefix" | "cross_fields" | "most_fields" | "phrase" | "phrase_prefix";
    tie_breaker?: number;
};


const escapeQueryString = (query: string) => {
    let modifiedQuery = query;
    modifiedQuery = modifiedQuery.replace(/(\>|\<)+/g, "");
    modifiedQuery = modifiedQuery.replace(/(\+|\-|\=|\&&|\|\||\!|\(|\)|\{|\}\|\[|\]|\^|\"|\~|\*|\?|\:|\\|\/)+/g, "\\$1");

    return modifiedQuery;
} 

export default class QueryStringProperty {
    private queryString: ESQueryString;
    constructor(queryString: ESQueryString) {
        this.queryString = queryString;
    }

    public build(): any {
        if (Object.keys(this.queryString).length === 0) {
            throw new Error("range() Error: You must specify gt/gte/lt/lte.");
        }

        this.queryString.query = escapeQueryString(this.queryString.query);

        return {
            query_string: this.queryString
        };
    }
}
