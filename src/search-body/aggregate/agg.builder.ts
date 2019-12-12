import { ESAggTypes } from "../..";
import CardinalityAggType from "./agg-type/cardinality.agg.type";
import FilterAggType from "./agg-type/filter.agg.type";
import NestedAggType from "./agg-type/nested.agg.type";
import TermsAggType from "./agg-type/terms.agg.type";
import ElasticSearchAggregateBuilder from "./aggregate.builder";
import ReverseNestedAggType from "./agg-type/reverse-nested.agg.type";

export default class AggBuilder {
    private name: string;
    private aggType: ESAggTypes | null = null;
    private aggregateBuilder: ElasticSearchAggregateBuilder<this> | null = null;
    private builder: ElasticSearchAggregateBuilder<this>;

    constructor(name: string, builder: ElasticSearchAggregateBuilder<any>) {
        this.name = name;
        this.builder = builder;
    }

    public nested(path: string) {
        const nestedAggType = new NestedAggType(path);
        this.aggType = nestedAggType;
        return this;
    }

    public reverseNested() {
        const reverseNestedAggTye = new ReverseNestedAggType();
        this.aggType = reverseNestedAggTye;
        return this;
    }

    public terms(
        field: string | null = null,
        script: string | null = null,
        missing: string | null = null,
        sharedMinDocCount: number | null = null,
        showTermDocCountError: boolean | null = null,
        size: number | null = null
    ) {
        const termsAggType = new TermsAggType(field, script, missing, sharedMinDocCount, showTermDocCountError, size);
        this.aggType = termsAggType;
        return this;
    }

    public cardinality(field: string) {
        const cardinalityAggType = new CardinalityAggType(field);
        this.aggType = cardinalityAggType;
        return this;
    }

    public filter() {
        const filterAggType = new FilterAggType(this);
        this.aggType = filterAggType;
        return filterAggType;
    }

    public aggregate(): ElasticSearchAggregateBuilder<this> {
        this.aggregateBuilder = new ElasticSearchAggregateBuilder<this>(this);
        return this.aggregateBuilder;
    }

    public build() {
        const agg: any = {
            [this.name]: {}
        };
        if (this.aggType !== null) {
            agg[this.name] = this.aggType.build();
        }
        if (this.aggregateBuilder !== null) {
            agg[this.name] = {
                ...agg[this.name],
                ...this.aggregateBuilder.build()
            };
        }
        return agg;
    }

    public end() {
        return this.builder;
    }
}