import ElasticSearchBuilder from ".";
import ElasticSearchSearchBodyBuilder from "./search-body/search-body.builder";
import ElasticSearchIndexBuilder from "./index/elastic-search-index-builder";

describe("ElasticSearch Builder", () => {
    /**
     * ElasticSearch Search Body Builder
     */
    it("Should return a valid ElasticSearchSearchBodyBuilder object.", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        expect(elasticSearchSearchBodyBuilder).toBeInstanceOf(ElasticSearchSearchBodyBuilder);
    });


    it("Should return a valid ElasticSearch object with size set to 10.", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .size(10)
            .build();

        const expectedSearchBody = {
            size: 10
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch object with searchAfter set to 'searchAfter'.", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .searchAfter("searchAfter")
            .build();

        const expectedSearchBody = {
            search_after: "searchAfter"
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch object with trackScores set to true.", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .trackScores(true)
            .build();

        const expectedSearchBody = {
            track_scores: true
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch object with enableSource set to false.", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .enableSource(false)
            .build();

        const expectedSearchBody = {
            _source: false
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch Aggregate object." , () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .aggregate()
            .end()
            .build();

        const expectedSearchBody = {
            aggs: {}
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch Aggregate object (sum).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .aggregate()
                .name("total")
                    .sum("price")
                .end()
            .end()
            .build();

        const expectedSearchBody = {
            aggs: {
                total: {
                    sum: {
                        field: "price"
                    }
                }
            }
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch Aggregate object (with agg).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .aggregate()
                .name("test")
                .end()
            .end()
            .build();

        const expectedSearchBody = {
            aggs: {
                test: {}
            }
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch Aggregate object (with agg-nested).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .aggregate()
                .name("test")
                    .nested("nestedObject")
                    .aggregate()
                        .name("investors")
                            .filter()
                                .bool()
                                    .must()
                                        .match("investors.historicalInstitution.isActive", true)
                                    .end()
                                .end()
                            .end()
                            .aggregate()
                                .name("totalUniqueInvestors")
                                .end()
                            .end()
                        .end()
                    .end()
                .end()
            .end()
            .build();

        const expectedSearchBody = {
            aggs: {
                test: {
                    nested: {
                        path: "nestedObject"
                    },
                    aggs: {
                        investors: {
                            filter: {
                                bool: {
                                    must: {
                                        match: {
                                            "investors.historicalInstitution.isActive": true
                                        }
                                    }
                                }
                            },
                            aggs: {
                                totalUniqueInvestors: {}
                            }
                        }
                    }
                }
            }
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch Aggregate object (with agg-nested).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .aggregate()
                .name("test")
                    .nested("nestedObject")
                    .aggregate()
                        .name("investors")
                        .end()
                    .end()
                .end()
            .build();

        const expectedSearchBody = {
            aggs: {
                test: {
                    nested: {
                        path: "nestedObject"
                    },
                    aggs: {
                        investors: {}
                    }
                }
            }
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch Aggregate object (with agg-nested-filter-bool).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .aggregate()
                .name("test")
                    .nested("nestedObject")
                    .aggregate()
                        .name("investors")
                            .filter()
                                .bool()
                                    .must()
                                        .match("investors.historicalInstitution.isActive", true)
                                    .end()
                                .end()
                            .end()
                            .aggregate()
                                .name("totalUniqueInvestors")
                                .end()
                            .end()
                        .end()
                    .end()
                .end()
            .end()
            .build();

        const expectedSearchBody = {
            aggs: {
                test: {
                    nested: {
                        path: "nestedObject"
                    },
                    aggs: {
                        investors: {
                            filter: {
                                bool: {
                                    must: {
                                        match: {
                                            "investors.historicalInstitution.isActive": true
                                        }
                                    }
                                }
                            },
                            aggs: {
                                totalUniqueInvestors: {}
                            }
                        }
                    }
                }
            }
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });


    it("Should return a valid ElasticSearch Aggregate object (with agg-nested-terms).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .aggregate()
                .name("test")
                    .nested("nestedObject")
                    .aggregate()
                        .name("investors")
                            .filter()
                                .bool()
                                    .must()
                                        .match("investors.historicalInstitution.isActive", true)
                                    .end()
                                .end()
                            .end()
                            .aggregate()
                                .name("groupBy")
                                    .terms("investors.historicalInstitution.sectors.keyword", null, "Other", 0, true)
                                    .aggregate()
                                        .name("totalUniqueInvestors")
                                            .cardinality("investors.historicalInstitution.id.keyword")
                                        .end()
                                    .end()
                                .end()
                            .end()
                        .end()
                    .end()
                .end()
            .end()
            .build();

        const expectedSearchBody = {
            aggs: {
                test: {
                    nested: {
                        path: "nestedObject"
                    },
                    aggs: {
                        investors: {
                            filter: {
                                bool: {
                                    must: {
                                        match: {
                                            "investors.historicalInstitution.isActive": true
                                        }
                                    }
                                }
                            },
                            aggs: {
                                groupBy: {
                                    terms: {
                                        field: "investors.historicalInstitution.sectors.keyword",
                                        shard_min_doc_count: 0,
                                        show_term_doc_count_error: true,
                                        missing: "Other"
                                    },
                                    aggs: {
                                        totalUniqueInvestors: {
                                            cardinality: {
                                                field: "investors.historicalInstitution.id.keyword"
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch Query object.", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .query()
            .end()
            .build();

        const expectedSearchBody = {
            query: {}
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch Query object (bool-must[match,match]).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .query()
                .bool()
                    .must()
                        .match("isActive", true)
                        .match("status", 10)
                    .end()
                .end()
            .build();

        const expectedSearchBody = {
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                isActive: true
                            }
                        },
                        {
                            match: {
                                status: 10
                            }
                        }
                    ]
                }
            }
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch Query object (bool-must_not[match,match]).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .query()
                .bool()
                    .mustNot()
                        .match("isActive", true)
                        .match("status", 10)
                    .end()
                .end()
            .build();

        const expectedSearchBody = {
            query: {
                bool: {
                    must_not: [
                        {
                            match: {
                                isActive: true
                            }
                        },
                        {
                            match: {
                                status: 10
                            }
                        }
                    ]
                }
            }
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch Query object (bool-should[match,match]).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .query()
                .bool()
                    .should()
                        .match("isActive", true)
                        .match("status", 10)
                    .end()
                .end()
            .build();

        const expectedSearchBody = {
            query: {
                bool: {
                    should: [
                        {
                            match: {
                                isActive: true
                            }
                        },
                        {
                            match: {
                                status: 10
                            }
                        }
                    ]
                }
            }
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch Query object (bool-[must-[match,match]],[should-[match,match]]).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .query()
                .bool()
                    .must()
                        .match("isActive", true)
                        .match("status", 10)
                    .end()
                    .should()
                        .match("isActive", true)
                        .match("status", 10)
                    .end()
                .end()
            .build();

        const expectedSearchBody = {
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                isActive: true
                            }
                        },
                        {
                            match: {
                                status: 10
                            }
                        }
                    ],
                    should: [
                        {
                            match: {
                                isActive: true
                            }
                        },
                        {
                            match: {
                                status: 10
                            }
                        }
                    ]
                }
            }
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });


    it("Should return a valid ElasticSearch Query object (bool-must-[match,term,term]).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .query()
                .bool()
                    .must()
                        .match("isActive", true)
                        .term("type.keyword", "typeKeyword")
                        .term("subType.keyword", "subTypeKeyword")
                    .end()
                .end()
            .build();

        const expectedSearchBody = {
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                isActive: true
                            }
                        },
                        {
                            term: {
                                "type.keyword": "typeKeyword"
                            }
                        },
                        {
                            term: {
                                "subType.keyword": "subTypeKeyword"
                            }
                        }
                    ]
                }
            }
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch Query object (bool-must-[bool-[match]]).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .query()
                .bool()
                    .must()
                        .bool()
                            .must()
                                .match("isActive", true)
                            .end()
                        .end()
                    .end()
                .end()
            .build();

        const expectedSearchBody = {
            query: {
                bool: {
                    must: {
                        bool: {
                            must: {
                                match: {
                                    isActive: true
                                }
                            }
                        }
                    }
                }
            }
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });


    it("Should return a valid ElasticSearch Query object (bool-must-[bool-must-match,bool-must-term]).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .query()
                .bool()
                    .must()
                        .bool()
                            .must()
                                .match("isActive", true)
                            .end()
                        .end()
                    .end()
                    .must()
                        .bool()
                            .must()
                                .term("name.keyword", "test")
                            .end()
                        .end()
                    .end()
                .end()
            .build();

        const expectedSearchBody = {
            query: {
                bool: {
                    must: [
                        {
                            bool: {
                                must: {
                                    match: {
                                        isActive: true
                                    }
                                }
                            }
                        },
                        {
                            bool: {
                                must: {
                                    term: {
                                        "name.keyword": "test"
                                    }
                                }
                            }
                        }
                    ]
                }
            }
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch Query object (bool-must-range).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .query()
                .bool()
                    .must()
                        .range("maxDealSize", { gte: 10 })
                    .end()
                .end()
            .build();

        const expectedSearchBody = {
            query: {
                bool: {
                    must: {
                        range: {
                            maxDealSize: {
                                gte: 10
                            }
                        }
                    }
                }
            }
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch Query object (bool-must-exists).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .query()
                .bool()
                    .must()
                        .exists("test")
                    .end()
                .end()
            .build();

        const expectedSearchBody = {
            query: {
                bool: {
                    must: {
                        exists: {
                            field: "test"
                        }
                    }
                }
            }
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch Query object (bool-must-script).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .query()
                .bool()
                    .must()
                        .script("someSource", { someParam: 1 })
                    .end()
                .end()
            .build();

        const expectedSearchBody = {
            query: {
                bool: {
                    must: {
                        script: {
                            script: {
                                source: "someSource",
                                params: {
                                    someParam: 1
                                }
                            }
                        }
                    }
                }
            }
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch Query object (bool-must-querystring).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .query()
                .bool()
                    .must()
                        .queryString({
                            query: "keyword",
                            type: "best_fields",
                            fields: [
                                "name^100",
                                "deal_investors.name^99",
                                "institution.name^99",
                                "snapshot^50",
                                "overview^30",
                                "sectors",
                                "regions",
                                "countries",
                                "sdgs",
                                "blending_approach_description",
                                "impact_statement"
                            ],
                            tie_breaker: 0.3
                        })
                    .end()
                .end()
            .build();

        const expectedSearchBody = {
            query: {
                bool: {
                    must: {
                        query_string: {
                            query: "keyword",
                            type: "best_fields",
                            fields: [
                                "name^100",
                                "deal_investors.name^99",
                                "institution.name^99",
                                "snapshot^50",
                                "overview^30",
                                "sectors",
                                "regions",
                                "countries",
                                "sdgs",
                                "blending_approach_description",
                                "impact_statement"
                            ],
                            tie_breaker: 0.3
                        }
                    }
                }
            }
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch Query object (bool-with-loop).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();
        const looper = ["1", "2", "3"];
        const searchBody = elasticSearchSearchBodyBuilder
            .query()
                .bool()
                    .must()
                        .bool(
                            (boolBuilder) => {
                                looper.map(
                                    num => boolBuilder.match("test", num)
                                );
                                return boolBuilder;
                            }
                        )
                        .bool(
                            (boolBuilder)  => {
                                looper.map(
                                    num => boolBuilder.match("test", num)
                                );
                                return boolBuilder;
                            }
                        )
                    .end()
                .end()
            .build();

        const expectedSearchBody = {
            query: {
                bool: {
                    must: {
                        bool: [
                            [
                                {
                                    match: {
                                        test: "1"
                                    }
                                },
                                {
                                    match: {
                                        test: "2"
                                    }
                                },
                                {
                                    match: {
                                        test: "3"
                                    }
                                }
                            ],
                            [
                                {
                                    match: {
                                        test: "1"
                                    }
                                },
                                {
                                    match: {
                                        test: "2"
                                    }
                                },
                                {
                                    match: {
                                        test: "3"
                                    }
                                }
                            ]
                        ]
                    }
                }
            }
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    it("Should return a valid ElasticSearch Query object (bool-must[match,match],sort-[relevance-desc,_score]).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .query()
                .bool()
                    .must()
                        .match("isActive", true)
                        .match("status", 10)
                    .end()
                .end()
            .end()
            .sort()
                .add("relevance", "desc")
                .addByScore()
            .end()
            .build();

        const expectedSearchBody = {
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                isActive: true
                            }
                        },
                        {
                            match: {
                                status: 10
                            }
                        }
                    ]
                }
            },
            sort: [
                { relevance: "desc" },
                "_score"
            ]
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });


    it("Should return a valid ElasticSearch Query object (bool-must-nestedObject).", () => {
        expect.assertions(1);
        const elasticSearchSearchBodyBuilder = ElasticSearchBuilder.instance().buildSearchBody();

        const searchBody = elasticSearchSearchBodyBuilder
            .query()
                .bool()
                    .must()
                        .nested("deal.investors")
                            .query()
                                .bool()
                                    .should()
                                        .match("deal.investors.id", "test")
                                    .end()
                                .end()
                            .end()
                        .end()
                    .end()
                .end()
            .build();

        const expectedSearchBody = {
            query: {
                bool: {
                    must: {
                        nested: {
                            path: "deal.investors",
                            query: {
                                bool: {
                                    should: {
                                        match: {
                                            "deal.investors.id": "test"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        };

        expect(searchBody).toStrictEqual(expectedSearchBody);
    });

    /**
     * ElasticSearch Search Index Builder
     */
    it("Should return a valid ElasticSearchIndexBuilder object.", () => {
        expect.assertions(1);
        const elasticSearchIndexBuilder = ElasticSearchBuilder.instance().buildIndex();

        expect(elasticSearchIndexBuilder).toBeInstanceOf(ElasticSearchIndexBuilder);
    });

    it("Should return a valid ElasticSearch Index Object.", () => {
        expect.assertions(1);
        const elasticSearchIndexBuilder = ElasticSearchBuilder.instance().buildIndex();
        const build = elasticSearchIndexBuilder
            .buildMapping()
                .nestedProperty("active_fund_manager")
                    .textProperty("domiciled_country")
                        .setFields({
                            keyword: {
                                type: "keyword",
                                ignore_above: 256
                            }
                        })
                    .end()
                    .textProperty("id").end()
                .end()
                .textProperty("activities_to_date").end()
                .plainProperty("institution")
                    .textProperty("name").end()
                .end()
            .endMapping()
            .build();

        expect(build).toStrictEqual({
            mappings: {
                properties: {
                    active_fund_manager: {
                        type: "nested",
                        properties: {
                            domiciled_country: {
                                type: "text",
                                fields: {
                                    keyword: {
                                        type: "keyword",
                                        ignore_above: 256
                                    }
                                }
                            },
                            id: {
                                type: "text"
                            }
                        }
                    },
                    activities_to_date: {
                        type: "text"
                    },
                    institution: {
                        properties: {
                            name: {
                                type: "text"
                            }
                        }
                    }
                }
            }
        });
    });

});
