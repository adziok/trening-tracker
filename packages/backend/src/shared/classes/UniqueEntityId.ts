import { randomUUID } from 'crypto';

export type TUniqueEntityId = string;

export class UniqueEntityId<T extends string = TUniqueEntityId> {
    protected constructor(private value: T) {}

    static generate(): UniqueEntityId {
        return new UniqueEntityId(randomUUID());
    }

    static recreate<T extends string = TUniqueEntityId>(value: T): UniqueEntityId {
        return new UniqueEntityId<T>(value);
    }

    equals(id?: UniqueEntityId): boolean {
        if (id === null || id === undefined) {
            return false;
        }
        if (!(id instanceof this.constructor)) {
            return false;
        }
        return id.toValue() === this.value;
    }

    toString() {
        return String(this.value);
    }

    toValue(): T {
        return this.value;
    }

    clone(): UniqueEntityId {
        return UniqueEntityId.recreate(this.toValue());
    }
}
