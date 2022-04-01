export class BaseError extends Error {}

export type Result<T, E extends BaseError = BaseError> = OkResult<T, E> | ErrorResult<T, E>;
export type AsyncResult<T> = Promise<Result<T>>;

export class OkResult<T, E> {
    constructor(public readonly value: T) {}

    isOk(): this is OkResult<T, E> {
        return true;
    }

    hasError(): this is ErrorResult<T, E> {
        return false;
    }

    map<N>(cb: (value: T) => Result<N>): Result<T | N> {
        try {
            return cb(this.value);
        } catch (e) {
            return err(e);
        }
    }
}

export class ErrorResult<T, E> {
    constructor(public readonly error: E) {}

    isOk(): this is OkResult<T, E> {
        return false;
    }

    hasError(): this is ErrorResult<T, E> {
        return true;
    }

    map<N>(cb: (value: T) => Result<N>): Result<T | N> {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this;
    }
}

export const ok = <T, E>(value: T): OkResult<T, E> => new OkResult(value);

export const err = <T, E>(error: E): ErrorResult<T, E> => new ErrorResult(error);
