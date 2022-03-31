export { UniqueEntityId } from './UniqueEntityId';
export { err, ok, Result, OkResult, ErrorResult } from './Result';

export const isDefined = (arg: unknown): arg is object | string | number | null => {
    return arg !== undefined;
};
