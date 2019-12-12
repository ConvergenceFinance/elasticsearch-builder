import ElasticSearchIndexBuilder from "./index/elastic-search-index-builder";
import ElasticSearchBoolBuilder from "./search-body/bool.builder";
import ElasticSearchNestedBuilder from "./search-body/query/nested.builder";
import ExistsProperty from "./search-body/property/exists.property";
import MatchProperty from "./search-body/property/match.property";
import QueryStringProperty from "./search-body/property/query-string.property";
import RangeProperty from "./search-body/property/range.property";
import TermProperty from "./search-body/property/term.property";
import ElasticSearchQueryBuilder from "./search-body/query/query.builder";
import ElasticSearchSearchBodyBuilder from "./search-body/search-body.builder";
import ElasticSearchSortBuilder from "./search-body/sort.builder";
import ScriptProperty from "./search-body/property/script.property";
import NestedAggType from "./search-body/aggregate/agg-type/nested.agg.type";
import FilterAggType from "./search-body/aggregate/agg-type/filter.agg.type";
import TermsAggType from "./search-body/aggregate/agg-type/terms.agg.type";
import CardinalityAggType from "./search-body/aggregate/agg-type/cardinality.agg.type";
import AggBuilder from "./search-body/aggregate/agg.builder";
import ElasticSearchAggregateBuilder from "./search-body/aggregate/aggregate.builder";
import ReverseNestedAggType from "./search-body/aggregate/agg-type/reverse-nested.agg.type";

export interface BuilderType {}

export type ESAggTypes = NestedAggType |
    FilterAggType |
    TermsAggType |
    CardinalityAggType |
    ReverseNestedAggType;

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
