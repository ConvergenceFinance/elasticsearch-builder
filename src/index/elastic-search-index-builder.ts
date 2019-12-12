import ElasticSearchPropertyBuilder from "./elastic-search-property-builder";

interface ElasticSearchSettings {
    index?: {
        number_of_shards?: Number;
        shard?: {
            check_on_startup?: Boolean | "checksum";
        };
        codec?: String;
        routing_partition_size?: Number;
        load_fixed_bitset_filters_eagerly?: Boolean;
        number_of_replicas?: Number;
        auto_expand_replicas?: Boolean | Number | String;
        search?: {
            idle?: {
                after?: Number;
            };
        };
        refresh_interval?: Number;
        max_result_window?: Number;
    };
}

export default class ElasticSearchIndexBuilder {
    private mappingProperties: ElasticSearchPropertyBuilder | null = null;
    indexName?: String;
    settings: ElasticSearchSettings;

    constructor() {
        this.settings = {};
    }

    static builder() {
        return new ElasticSearchIndexBuilder();
    }

    public buildMapping(): ElasticSearchPropertyBuilder {
        const mappingProperties = new ElasticSearchPropertyBuilder(this);
        this.mappingProperties = mappingProperties;
        return mappingProperties;
    }

    public end(): ElasticSearchIndexBuilder {
        return this;
    }

    public build(): any {
        const properties: any = {};

        if (this.mappingProperties !== null) {
            for (const property of this.mappingProperties.build()) {
                properties[property.name] = property.property.build();
            }
        }

        const mappings: any = {};
        if (Object.keys(properties).length > 0) {
            mappings.properties = properties;
        }

        return {
            mappings
        };
    }
}
