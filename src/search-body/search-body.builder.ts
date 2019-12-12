import ElasticSearchSortBuilder from "./sort.builder";
import ElasticSearchQueryBuilder from "./query/query.builder";
import ElasticSearchAggregateBuilder from "./aggregate/aggregate.builder";

export default class ElasticSearchSearchBodyBuilder {
    private sortBuilder: ElasticSearchSortBuilder<this> | null = null;
    private queryBuilder: ElasticSearchQueryBuilder | null = null;
    private aggregateBuilder: ElasticSearchAggregateBuilder<this> | null = null;
    private searchSource: boolean | null = null;
    private searchSize: number | null = null;
    private searchTrackScores: boolean | null = null;
    private searchSearchAfter: Array<string> | Array<number> | string | number | null = null;

    public size(size: number) {
        this.searchSize = size;
        return this;
    }

    public searchAfter(searchAfter: Array<string> | Array<number> | string | number) {
        this.searchSearchAfter = searchAfter;
        return this;
    }

    public trackScores(trackScores: boolean) {
        this.searchTrackScores = trackScores;
        return this;
    }

    public enableSource(enableSource: boolean) {
        this.searchSource = enableSource;
        return this;
    }

    static builder() {
        return new ElasticSearchSearchBodyBuilder();
    }

    public aggregate(): ElasticSearchAggregateBuilder<this> {
        this.aggregateBuilder = new ElasticSearchAggregateBuilder(this);
        return this.aggregateBuilder;
    }

    public query(): ElasticSearchQueryBuilder {
        this.queryBuilder = new ElasticSearchQueryBuilder(this);
        return this.queryBuilder;
    }

    public sort(): ElasticSearchSortBuilder {
        this.sortBuilder = new ElasticSearchSortBuilder(this);
        return this.sortBuilder;
    }

    public build(): any {
        let searchBody: any = {};
        if (this.queryBuilder !== null) {
            searchBody = {
                ...searchBody,
                ...this.queryBuilder.build()
            };
        }
        if (this.aggregateBuilder !== null) {
            searchBody = {
                ...searchBody,
                ...this.aggregateBuilder.build()
            };
        }
        if (this.sortBuilder !== null) {
            searchBody = {
                ...searchBody,
                ...this.sortBuilder.build()
            };
        }
        if (this.searchSearchAfter !== null) {
            searchBody.search_after = this.searchSearchAfter;
        }
        if (this.searchSize !== null) {
            searchBody.size = this.searchSize;
        }
        if (this.searchTrackScores !== null) {
            searchBody.track_scores = this.searchTrackScores;
        }
        if (this.searchSource !== null) {
            searchBody._source = this.searchSource;
        }
        return searchBody;
    }
}
