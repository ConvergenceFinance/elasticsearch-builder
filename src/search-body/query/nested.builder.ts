import { ESQueryBuilderTypes } from "../..";
import ElasticSearchNestedQueryBuilder from "./nested-query.builder";

export default class ElasticSearchNestedBuilder<T = ESQueryBuilderTypes> {
    private builder: T;
    private path: string;
    private nestedQueryBuilder: ElasticSearchNestedQueryBuilder | null = null;

    constructor(path: string, builder: T) {
        this.path = path;
        this.builder = builder;
    }

    public query() {
        const nestedQueryBuilder: ElasticSearchNestedQueryBuilder = new ElasticSearchNestedQueryBuilder(this);
        this.nestedQueryBuilder = nestedQueryBuilder;
        return nestedQueryBuilder;
    }

    public end() {
        return this.builder;
    }

    public build(): any {
        const path = this.path;
        return {
            nested: {
                path,
                ...(this.nestedQueryBuilder !== null ? this.nestedQueryBuilder.build() : {})
            }
        };
    }
}
