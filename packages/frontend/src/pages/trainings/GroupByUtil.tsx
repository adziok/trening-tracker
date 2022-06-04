import dayjs from 'dayjs';

export const groupBy = <ArrayElement extends Record<string, unknown>, GroupKey extends keyof ArrayElement>(
    array: ArrayElement[],
    key: GroupKey
): Record<GroupKey, ArrayElement[]> =>
    array.reduce((previousValue, currentValue) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const groupByKeyValue = dayjs(currentValue[key]).format('YYYY-MM-DD');
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (previousValue?.[groupByKeyValue]) {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
            previousValue?.[groupByKeyValue].push(currentValue);
            return previousValue;
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return { ...previousValue, [groupByKeyValue]: [currentValue] };
    }, {} as Record<GroupKey, ArrayElement[]>);
