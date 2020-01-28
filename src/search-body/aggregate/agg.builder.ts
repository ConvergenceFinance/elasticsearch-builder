import { ESAggTypes } from "../..";
import CardinalityAggType from "./agg-type/cardinality.agg.type";
import FilterAggType from "./agg-type/filter.agg.type";
import NestedAggType from "./agg-type/nested.agg.type";
import TermsAggType from "./agg-type/terms.agg.type";
import ElasticSearchAggregateBuilder from "./aggregate.builder";
import ReverseNestedAggType from "./agg-type/reverse-nested.agg.type";
import SumAggType from "./agg-type/sum.agg.type";
import RangeAggType, { ElasticSearchRange, RangeMethod } from "./agg-type/range.agg.type";
import BucketSortAggType from "./agg-type/bucket-sort.agg.type";
import AvgAggType from "./agg-type/avg.agg.type";
import ValueCountAggType from "./agg-type/value-count.agg.type";

export default class AggBuilder {
    private name: string;
    private aggType: ESAggTypes | null = null;
    private aggregateBuilder: ElasticSearchAggregateBuilder<this> | null = null;
    private builder: ElasticSearchAggregateBuilder<this>;

    constructor(name: string, builder: ElasticSearchAggregateBuilder<any>) {
        this.name = name;
        this.builder = builder;
    }

    public bucketSort(builder?: (bucketSortAggType: BucketSortAggType) => void, from: number | null = null, size: number | null = null, gapPolicy: string | null = null) {
        const bucketSortAggType = new BucketSortAggType(builder, from, size, gapPolicy);
        this.aggType = bucketSortAggType;
        return this;
    }

    public range(field: string, ranges: Array<ElasticSearchRange> | RangeMethod) {
        const rangeAggType = new RangeAggType(field, ranges);
        this.aggType = rangeAggType;
        return this;
    }

    public avg(field: string) {
        const avgAggType = new AvgAggType(field);
        this.aggType = avgAggType;
        return this;
    }

    public sum(field: string) {
        const sumAggType = new SumAggType(field);
        this.aggType = sumAggType;
        return this;
    }

    public valueCount(field: string) {
        const valueCountAggType = new ValueCountAggType(field);
        this.aggType = valueCountAggType;
        return this;
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
