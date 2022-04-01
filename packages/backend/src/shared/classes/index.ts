export { UniqueEntityId } from './UniqueEntityId';
export { err, ok, Result, OkResult, ErrorResult } from './Result';
export { DateUtils } from './DateUtils';
export { Entity } from './Entity';

export const isDefined = (arg: unknown): arg is object | string | number | null => {
    return arg !== undefined;
};
