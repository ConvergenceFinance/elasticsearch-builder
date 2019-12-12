import ElasticSearchBoolBuilder from "../../bool.builder";
import AggBuilder from "../agg.builder";

export default class FilterAggType {
    private boolBuilder: ElasticSearchBoolBuilder<this> | null = null;
    private builder: AggBuilder;

    constructor(builder: AggBuilder) {
        this.builder = builder;
    }

    public bool(): ElasticSearchBoolBuilder<this>;
    public bool(builder: (boolBuilder: ElasticSearchBoolBuilder<this>) => ElasticSearchBoolBuilder<this>): this;
    public bool(builder?: (boolBuilder: ElasticSearchBoolBuilder<this>) => ElasticSearchBoolBuilder<this>): this | ElasticSearchBoolBuilder<this> {
        this.boolBuilder = new ElasticSearchBoolBuilder<this>(this);
        if (typeof builder !== "undefined") {
            return builder(this.boolBuilder).end();
        }
        return this.boolBuilder;
    }

    public build() {
        const filter: any = {};
        if (this.boolBuilder !== null) {
            filter.bool = this.boolBuilder.build();
        }
        return {
            filter
        };
    }

    public end() {
        return this.builder;
    }
}
