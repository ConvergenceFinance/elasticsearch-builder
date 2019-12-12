import ElasticSearchPropertyBuilder from "./elastic-search-property-builder";

export interface PropertyAndName {
    name: string;
    property: ElasticSearchMappingProperty;
}

export default class ElasticSearchMappingProperty {
    private builder: ElasticSearchPropertyBuilder;
    type?: string;
    include_in_parent?: Boolean;
    properties?: Array<PropertyAndName>;
    fields?: any;

    constructor(builder: ElasticSearchPropertyBuilder, type?: string) {
        this.type = type;
        this.builder = builder;
    }

    public setFields(fields: any) {
        this.fields = fields;
        return this;
    }

    public setIncludeInParent(includeInParent: boolean): ElasticSearchMappingProperty {
        this.include_in_parent = includeInParent;
        return this;
    }

    public end() {
        return this.builder;
    }

    public build(): any {
        const newObject: any = {};
        if (typeof this.type !== "undefined") {
            newObject.type = this.type;
        }
        if (typeof this.include_in_parent !== "undefined") {
            newObject.include_in_parent = this.include_in_parent;
        }
        if (typeof this.fields !== "undefined") {
            newObject.fields = this.fields;
        }
        if (typeof this.properties !== "undefined") {
            newObject.properties = {};
            for (const propertyAndName of this.properties) {
                newObject.properties[propertyAndName.name] = propertyAndName.property.build();
            }
        }
        return newObject;
    }
}
