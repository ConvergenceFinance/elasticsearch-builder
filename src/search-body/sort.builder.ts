import ElasticSearchSearchBodyBuilder from "./search-body.builder";

type SortValue = { [key: string]: { order: "asc" | "desc" } | "asc" | "desc" } | string;

export default class ElasticSearchSortBuilder<T = ElasticSearchSearchBodyBuilder> {
    private builder: T;
    private stack: Array<SortValue> = [];

    constructor(builder: T) {
        this.builder = builder;
    }

    public add(key: string, value: "asc" | "desc") {
        this.stack.push({
            [key]: value
        });
        return this;
    }

    public end() {
        return this.builder;
    }

    public addByScore() {
        this.stack.push("_score");
        return this;
    }

    public build(): any {
        return {
            sort: this.stack
        };
    }
}
