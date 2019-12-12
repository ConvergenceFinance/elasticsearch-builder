import ElasticSearchNestedBuilder from "./nested.builder";
import ElasticSearchBoolBuilder from "../bool.builder";

export default class ElasticSearchNestedQueryBuilder {
    private builder: ElasticSearchNestedBuilder<any>;
    private boolBuilder: ElasticSearchBoolBuilder<any> | null = null;

    constructor(builder: ElasticSearchNestedBuilder<any>) {
        this.builder = builder;
    }

    public bool() {
        const boolBuilder = new ElasticSearchBoolBuilder<this>(this);
        this.boolBuilder = boolBuilder;
        return boolBuilder;
    }

    public build(): any {
        const query: any = {};
        if (this.boolBuilder != null) {
            query.bool = this.boolBuilder.build();
        }
        return {
            query
        };
    }

    public end() {
        return this.builder;
    }
}
