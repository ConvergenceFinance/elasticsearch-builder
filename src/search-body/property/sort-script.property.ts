export interface ScriptParams {
    [key: string]: string | number;
}

export default class ScriptProperty {
    private source: string;
    private params: ScriptParams | null = null;
    private type: string;
    private order: string;

    constructor(source: string, params?: ScriptParams, type?: string, order?: string) {
        this.source = source;
        this.order = order || 'asc';
        this.type = type || 'number';
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
            _script: {
                type: this.type,
                script,
                order: this.order
            }
        };
    }
}
