import { ESAggTypes } from "../../..";

export default class TermsAggType implements ESAggTypes {
    private field: string | null = null;
    private script: string | null = null;
    private sharedMinDocCount: number | null = null;
    private missing: string | null = null;
    private showTermDocCountError: boolean | null = null;
    private size: number | null = null;

    constructor(
        field: string | null = null,
        script: string | null = null,
        missing: string | null = null,
        sharedMinDocCount: number | null = null,
        showTermDocCountError: boolean | null = null,
        size: number | null = null
    ) {
        this.field = field;
        this.script = script;
        this.missing = missing;
        this.sharedMinDocCount = sharedMinDocCount;
        this.showTermDocCountError = showTermDocCountError;
        this.size = size;
    }

    public build() {
        const terms: any = {};
        if (this.field === null && this.script === null) {
            throw new Error("TermsAggType Error: You must either supply a 'script' or 'field' value.");
        }
        if (this.field !== null) {
            terms.field = this.field;
        }
        if (this.script !== null) {
            terms.script = this.script;
        }
        if (this.missing !== null) {
            terms.missing = this.missing;
        }
        if (this.sharedMinDocCount !== null) {
            terms.shard_min_doc_count = this.sharedMinDocCount;
        }
        if (this.showTermDocCountError !== null) {
            terms.show_term_doc_count_error = this.showTermDocCountError;
        }
        if (this.size !== null) {
            terms.size = this.size;
        }
        return {
            terms
        };
    }
}
