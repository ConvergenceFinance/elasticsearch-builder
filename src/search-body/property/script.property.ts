export interface ScriptParams {
    [key: string]: string | number;
}

export default class ScriptProperty {
    private source: string;
    private params: ScriptParams | null = null;

    constructor(source: string, params?: ScriptParams) {
        this.source = source;
        if (params) {
            this.params = params;
        }
    }

    build(): any {
        const script: any = {
            source: this.source
        };

        if (this.params !== null) {
            script.params = this.params;
        }

        return {
            script: {
                script
            }
        };
    }
}
