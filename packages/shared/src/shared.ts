export type TestTypeFromShared = {
    name: string;
};

export type HelloConventionalCommits = {
    name: string;
    test: string;
};

export type MutableActionResultDto = {
    id: string;
};

export type IBaseServerError = {
    message: string;
};

export type IPaginationQueryDto = {
    limit: number;
    skip: number;
};

export type IPaginationDto<T> = {
    nodes: T[];
    totalCount: number;
    skip: number;
    nextUrl: string;
};

export * from './training';
