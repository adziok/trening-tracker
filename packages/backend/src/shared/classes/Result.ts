export class BaseError extends Error {}

export type Result<T, E extends BaseError = BaseError> = OkResult<T, E> | ErrorResult<T, E>;

export class OkResult<T, E> {
    public constructor(public readonly value: T) {}

    public isOk(): this is OkResult<T, E> {
        return true;
    }

    public hasError(): this is ErrorResult<T, E> {
        return false;
    }
}

export class ErrorResult<T, E> {
    public constructor(public readonly error: E) {}

    public isOk(): this is OkResult<T, E> {
        return false;
    }

    public hasError(): this is ErrorResult<T, E> {
        return true;
    }
}

export const ok = <T, E>(value: T): OkResult<T, E> => new OkResult(value);

export const err = <T, E>(error: E): ErrorResult<T, E> => new ErrorResult(error);
