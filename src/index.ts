import ElasticSearchIndexBuilder from "./index/elastic-search-index-builder";
import AggBuilder from "./search-body/aggregate/agg.builder";
import ElasticSearchAggregateBuilder from "./search-body/aggregate/aggregate.builder";
import ElasticSearchBoolBuilder from "./search-body/bool.builder";
import ExistsProperty from "./search-body/property/exists.property";
import MatchProperty from "./search-body/property/match.property";
import QueryStringProperty from "./search-body/property/query-string.property";
import RangeProperty from "./search-body/property/range.property";
import ScriptProperty from "./search-body/property/script.property";
import TermProperty from "./search-body/property/term.property";
import ElasticSearchNestedBuilder from "./search-body/query/nested.builder";
import ElasticSearchQueryBuilder from "./search-body/query/query.builder";
import ElasticSearchSearchBodyBuilder from "./search-body/search-body.builder";
import ElasticSearchSortBuilder from "./search-body/sort.builder";

export interface BuilderType {}

export interface ESAggTypes {
    build(): any;
}

export type ESAggBuilderTypes = ElasticSearchSearchBodyBuilder | ElasticSearchAggregateBuilder<any> | AggBuilder;

export type ESQueryBuilderTypes = ElasticSearchQueryBuilder |
    ElasticSearchNestedBuilder<any> |
    ElasticSearchSortBuilder<any> |
    ElasticSearchBoolBuilder<any>;

export type ElasticSearchFilters =
    ScriptProperty |
    ExistsProperty |
    MatchProperty |
    TermProperty |
    RangeProperty |
    QueryStringProperty |
    ElasticSearchNestedBuilder<ESQueryBuilderTypes> |
    ElasticSearchBoolBuilder<ESQueryBuilderTypes>;

export default class ElasticSearchBuilder {
    static instance() {
        return new ElasticSearchBuilder();
    }

    public buildIndex() {
        return ElasticSearchIndexBuilder.builder();
    }

    public buildSearchBody() {
        return ElasticSearchSearchBodyBuilder.builder();
    }
}
