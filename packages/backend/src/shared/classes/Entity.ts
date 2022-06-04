import { UniqueEntityId } from './UniqueEntityId';

const isEntity = (v: any): v is Entity<any> => {
    return v instanceof Entity;
};

export class Entity<T> {
    public readonly props: T;
    protected readonly _id: UniqueEntityId;

    protected constructor(props: T, id: UniqueEntityId) {
        this._id = id;
        this.props = props;
    }

    get id(): UniqueEntityId {
        return this._id;
    }

    static createInstance() {
        return new this({}, null);
    }

    public equals(object?: Entity<T>): boolean {
        if (object === null || object === undefined) {
            return false;
        }

        if (this === object) {
            return true;
        }

        if (!isEntity(object)) {
            return false;
        }

        return this._id.equals(object._id);
    }
}
