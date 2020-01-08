import ElasticSearchSearchBodyBuilder from "../search-body.builder";
import ElasticSearchBoolBuilder from "../bool.builder";

export default class ElasticSearchQueryBuilder {
    private builder: ElasticSearchSearchBodyBuilder;
    private boolBuilder: ElasticSearchBoolBuilder<ElasticSearchQueryBuilder> | null = null;

    constructor(builder: ElasticSearchSearchBodyBuilder) {
        this.builder = builder;
    }

    public bool(): ElasticSearchBoolBuilder<this>;
    public bool(builder: (boolBuilder: ElasticSearchBoolBuilder<this>) => ElasticSearchBoolBuilder<this>): this;
    public bool(builder?: (boolBuilder: ElasticSearchBoolBuilder<this>) => ElasticSearchBoolBuilder<this>): ElasticSearchBoolBuilder<this> | this {
        const boolBuilder = new ElasticSearchBoolBuilder(this);
        this.boolBuilder = boolBuilder;
        if (typeof builder !== "undefined") {
            return builder(boolBuilder).end();
        }
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
