import ElasticSearchMappingProperty, { PropertyAndName } from "./elastic-search-mapping-property";
import ElasticSearchIndexBuilder from "./elastic-search-index-builder";

export default class ElasticSearchPropertyBuilder {
    private originalBuilder: ElasticSearchIndexBuilder;
    private builder: ElasticSearchPropertyBuilder | null = null;
    public properties: Array<PropertyAndName> = [];

    constructor(originalBuilder: ElasticSearchIndexBuilder, builder: ElasticSearchPropertyBuilder | null = null) {
        this.originalBuilder = originalBuilder;
        this.builder = builder;
    }

    public plainProperty(name: string) {
        const property = new ElasticSearchMappingProperty(this);
        this.addProperty(name, property);
        const propertyBuilder = new ElasticSearchPropertyBuilder(this.originalBuilder, this);
        property.properties = propertyBuilder.build();
        return propertyBuilder;
    }

    public nestedProperty(name: string) {
        const property = new ElasticSearchMappingProperty(this, "nested");
        this.addProperty(name, property);
        const propertyBuilder = new ElasticSearchPropertyBuilder(this.originalBuilder, this);
        property.properties = propertyBuilder.build();
        return propertyBuilder;
    }

    public dateProperty(name: string) {
        const property = new ElasticSearchMappingProperty(this, "date");
        return this.addProperty(name, property);
    }

    public textProperty(name: string) {
        const property = new ElasticSearchMappingProperty(this, "text");
        return this.addProperty(name, property);
    }

    public longProperty(name: string) {
        const property = new ElasticSearchMappingProperty(this, "long");
        return this.addProperty(name, property);
    }

    public endMapping(): ElasticSearchIndexBuilder {
        return this.originalBuilder;
    }

    public end(): ElasticSearchPropertyBuilder {
        if (this.builder === null) {
            throw Error("You attempted to call end() after you have already reached the end of the stack. Maybe try calling endMapping() instead?");
        }
        return this.builder;
    }

    public build(): Array<PropertyAndName> {
        return this.properties;
    }

    private addProperty(name: string, property: ElasticSearchMappingProperty) {
        this.properties.push({ name, property });
        return property;
    }
}
