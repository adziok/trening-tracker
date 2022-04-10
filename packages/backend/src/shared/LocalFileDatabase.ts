import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export class LocalFileDatabase<Type, T = Record<string, Type>> {
    data: T;

    constructor(private readonly databaseName: string) {
        this.data = {} as T;
        this.load();
    }

    save() {
        writeFileSync(this.getDbPatch(), JSON.stringify(this.data), {
            encoding: 'utf-8',
        });
    }

    private getDbPatch() {
        return join(__dirname, '..', '..', 'db', `${this.databaseName}.json`);
    }

    load() {
        if (!existsSync(this.getDbPatch())) {
            this.save();
        }
        const dataText = readFileSync(this.getDbPatch(), { encoding: 'utf8', flag: 'r' });

        this.data = ((dataText && JSON.parse(dataText)) || {}) as T;
    }
}
