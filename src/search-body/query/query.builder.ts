import ElasticSearchSearchBodyBuilder from "../search-body.builder";
import ElasticSearchBoolBuilder from "../bool.builder";

export default class ElasticSearchQueryBuilder {
    private builder: ElasticSearchSearchBodyBuilder;
    private boolBuilder: ElasticSearchBoolBuilder<ElasticSearchQueryBuilder> | null = null;

    constructor(builder: ElasticSearchSearchBodyBuilder) {
        this.builder = builder;
    }

    public bool() {
        const boolBuilder = new ElasticSearchBoolBuilder(this);
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
