export const groupBy = <ArrayElement extends Record<string, unknown>, GroupKey extends keyof ArrayElement>(
    array: ArrayElement[],
    key: GroupKey
): Record<GroupKey, ArrayElement[]> =>
    array.reduce((previousValue, currentValue) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (previousValue?.[currentValue[key]]) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            previousValue?.[currentValue[key]].push(currentValue);
            return previousValue;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return { ...previousValue, [currentValue[key]]: [currentValue] };
    }, {} as Record<GroupKey, ArrayElement[]>);
