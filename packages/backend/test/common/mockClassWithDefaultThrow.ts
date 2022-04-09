type ClassRef = Record<string, any>;

type FunctionPropertyNames<T> = {
    // eslint-disable-next-line @typescript-eslint/ban-types
    [K in keyof T]: T[K] extends Function ? K : never;
}[keyof T];

type FunctionProperties<T> = Pick<T, FunctionPropertyNames<T>>;

export const mockClassWithDefaultThrow = <T extends ClassRef>(
    classToMock: any,
    overrideMethods: Partial<FunctionProperties<T>> = {}
): jest.Mocked<T> => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
    return Reflect.ownKeys(classToMock.prototype)
        .filter((key) => key !== 'constructor')
        .map((key) => ({
            [key]: jest.fn().mockImplementation(() => {
                // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access,@typescript-eslint/restrict-template-expressions
                throw new Error(`Method ${classToMock.name}->${key.toString()}(): is not implemented`);
            }),
        }))
        .reduce((prev, curr) => ({ ...curr, ...prev }), overrideMethods) as jest.Mocked<T>;
};
