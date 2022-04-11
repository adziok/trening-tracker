import { existsSync, readFileSync, writeFileSync } from 'fs';

export class FSWrapper {
    static writeFileSync(path: string, data: string) {
        writeFileSync(path, data, {
            encoding: 'utf-8',
        });
    }

    static readFileSync(path: string): string {
        return readFileSync(path, { encoding: 'utf8', flag: 'r' });
    }

    static existsSync(dbPatch: string) {
        return existsSync(dbPatch);
    }
}
