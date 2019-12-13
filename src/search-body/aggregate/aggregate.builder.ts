import AggBuilder from "./agg.builder";
import { ESAggBuilderTypes } from "../..";

export default class ElasticSearchAggregateBuilder<T extends ESAggBuilderTypes> {
    private aggBuilder: Array<AggBuilder> = [];
    private builder: T;

    constructor(builder: T) {
        this.builder = builder;
    }

    public name(name: string): AggBuilder {
        const aggBuilder = new AggBuilder(name, this);
        this.aggBuilder.push(aggBuilder);
        return aggBuilder;
    }

    public build(): any {
        let aggs: any = {};
        if (this.aggBuilder.length > 0) {
            this.aggBuilder.forEach((agg) => aggs = {...aggs, ...agg.build()} );
        }
        return {
            aggs
        };
    }

    public end(): T {
        return this.builder;
    }
}
