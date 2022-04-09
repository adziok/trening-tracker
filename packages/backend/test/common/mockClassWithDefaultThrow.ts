type ClassRef = Record<string, any>;

type Type<T> = Record<string, unknown> & {
    new (...args: any[]): T;
    prototype: Record<string, unknown>;
};

type FunctionPropertyNames<T> = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

export const mockClassWithDefaultThrow = <T extends ClassRef>(
    classToMock: Type<T>,
    overrideMethods: Partial<FunctionProperties<T>> = {}
): jest.Mocked<T> => {
    return Reflect.ownKeys(classToMock.prototype)
        .filter((key) => key !== 'constructor')
        .map((key) => ({
            [key]: jest.fn().mockImplementation(() => {
                throw new Error(`Method ${classToMock.name}->${key.toString()}(): is not implemented`);
            }),
        }))
        .reduce((prev, curr) => ({ ...curr, ...prev }), overrideMethods) as jest.Mocked<T>;
};
