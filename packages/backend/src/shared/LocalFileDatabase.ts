import { join } from 'path';
import { FSWrapper } from './FSWRapper';

export class LocalFileDatabase<Type, T = Record<string, Type>> {
    data: T;

    constructor(private readonly databaseName: string) {
        this.data = {} as T;
        this.load();
    }

    save() {
        FSWrapper.writeFileSync(this.getDbPatch(), JSON.stringify(this.data));
    }

    private getDbPatch() {
        return join(__dirname, '..', '..', 'db', `${this.databaseName}.json`);
    }

    load() {
        if (!FSWrapper.existsSync(this.getDbPatch())) {
            this.save();
        }
        const dataText = FSWrapper.readFileSync(this.getDbPatch());

        this.data = ((dataText && JSON.parse(dataText)) || {}) as T;
    }
}
