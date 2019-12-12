import { ESQueryBuilderTypes, ElasticSearchFilters } from "..";
import ElasticSearchNestedBuilder from "./query/nested.builder";
import TermProperty from "./property/term.property";
import MatchProperty from "./property/match.property";
import RangeProperty, { ESRanges } from "./property/range.property";
import QueryStringProperty, { ESQueryString } from "./property/query-string.property";
import ExistsProperty from "./property/exists.property";
import ScriptProperty, { ScriptParams } from "./property/script.property";

enum ESBoolTypes {
    Bool,
    Should,
    Must,
    Must_Not,
    Property
}

export default class ElasticSearchBoolBuilder<T = ESQueryBuilderTypes> {
    private builder: T;
    private esMinimumShouldMatch: number | null = null;
    private stack: Array<[ESBoolTypes, ElasticSearchFilters]> = [];

    constructor(builder: T) {
        this.builder = builder;
    }

    public minimumShouldMatch(minimumShouldMatch: number) {
        this.esMinimumShouldMatch = minimumShouldMatch;
        return this;
    }

    public should(): ElasticSearchBoolBuilder<this>;
    public should(builder: (boolBuilder: ElasticSearchBoolBuilder<this>) => ElasticSearchBoolBuilder<this>): this;
    public should(builder?: (boolBuilder: ElasticSearchBoolBuilder<this>) => ElasticSearchBoolBuilder<this>): ElasticSearchBoolBuilder<this> | this {
        const shouldBuilder = new ElasticSearchBoolBuilder(this);
        this.stack.push([ESBoolTypes.Should, shouldBuilder]);
        if (typeof builder !== "undefined") {
            return builder(shouldBuilder).end();
        }
        return shouldBuilder;
    }

    public must() {
        const mustBuilder = new ElasticSearchBoolBuilder(this);
        this.stack.push([ESBoolTypes.Must, mustBuilder]);
        return mustBuilder;
    }

    public mustNot() {
        const mustBuilder = new ElasticSearchBoolBuilder(this);
        this.stack.push([ESBoolTypes.Must_Not, mustBuilder]);
        return mustBuilder;
    }

    public bool(): ElasticSearchBoolBuilder<this>;
    public bool(builder: (boolBuilder: ElasticSearchBoolBuilder<this>) => ElasticSearchBoolBuilder<this>): this;
    public bool(builder?: (boolBuilder: ElasticSearchBoolBuilder<this>) => ElasticSearchBoolBuilder<this>): ElasticSearchBoolBuilder<this> | this {
        const boolBuilder = new ElasticSearchBoolBuilder(this);
        this.stack.push([ESBoolTypes.Bool, boolBuilder]);
        if (typeof builder !== "undefined") {
            return builder(boolBuilder).end();
        }
        return boolBuilder;
    }

    public nested(path: string) {
        const nestedBuilder = new ElasticSearchNestedBuilder(path, this);
        this.stack.push([ESBoolTypes.Property, nestedBuilder]);
        return nestedBuilder;
    }

    public term(key: string, value: string | number | boolean) {
        const match = new TermProperty(key, value);
        this.stack.push([ESBoolTypes.Property, match]);
        return this;
    }

    public match(key: string, value: string | number | boolean) {
        const match = new MatchProperty(key, value);
        this.stack.push([ESBoolTypes.Property, match]);
        return this;
    }

    public exists(field: string) {
        const exists = new ExistsProperty(field);
        this.stack.push([ESBoolTypes.Property, exists]);
        return this;
    }

    public range(key: string, ranges: ESRanges) {
        const range = new RangeProperty(key, ranges);
        this.stack.push([ESBoolTypes.Property, range]);
        return this;
    }

    public queryString(queryStrings: ESQueryString) {
        const queryString = new QueryStringProperty(queryStrings);
        this.stack.push([ESBoolTypes.Property, queryString]);
        return this;
    }

    public script(source: string, params?: ScriptParams) {
        const script = new ScriptProperty(source, params);
        this.stack.push([ESBoolTypes.Property, script]);
        return this;
    }

    public build(): any {
        const rtnStack: Array<any> = [];
        const buildObject: any = {
            should: [],
            must: [],
            mustNot: [],
            bool: []
        };
        if (this.stack.length > 0) {
            for (const [type, stack] of this.stack) {
                switch (type) {
                    case ESBoolTypes.Should: {
                        buildObject.should.push(stack.build());
                        break;
                    }
                    case ESBoolTypes.Must: {
                        buildObject.must.push(stack.build());
                        break;
                    }
                    case ESBoolTypes.Must_Not: {
                        buildObject.mustNot.push(stack.build());
                        break;
                    }
                    case ESBoolTypes.Bool: {
                        buildObject.bool.push(stack.build());
                        break;
                    }
                    default: {
                        rtnStack.push(stack.build());
                    }
                }
            }
        }

        const rtnObject: any = {};
        if (buildObject.should.length > 0) {
            rtnObject.should = (buildObject.should.length === 1) ? buildObject.should[0] : buildObject.should;
        }
        if (buildObject.must.length > 0) {
            rtnObject.must = (buildObject.must.length === 1) ? buildObject.must[0] : buildObject.must;
        }
        if (buildObject.mustNot.length > 0) {
            rtnObject.must_not = (buildObject.mustNot.length === 1) ? buildObject.mustNot[0] : buildObject.mustNot;
        }
        if (buildObject.bool.length > 0) {
            rtnObject.bool = (buildObject.bool.length === 1) ? buildObject.bool[0] : buildObject.bool;
        }
        if (this.esMinimumShouldMatch != null) {
            rtnObject.minimum_should_match = this.esMinimumShouldMatch;
        }

        return rtnStack.length > 0 ? (rtnStack.length === 1 ? rtnStack[0] : rtnStack) : rtnObject;
    }

    public end() {
        return this.builder;
    }
}
