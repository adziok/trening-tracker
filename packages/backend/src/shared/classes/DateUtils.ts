type TimeType = 'milliseconds' | 'seconds' | 'minutes' | 'hours' | 'days' | 'weeks';

const timeTypeToMilliseconds: Record<TimeType, number> = {
    milliseconds: 1,
    seconds: 1000,
    minutes: 60 * 1000,
    hours: 60 * 60 * 1000,
    days: 24 * 60 * 60 * 1000,
    weeks: 7 * 24 * 60 * 60 * 1000,
};

export class DateUtils {
    static now(): Date {
        return new Date();
    }

    static fromTimestamp(timestamp: number): Date {
        return new Date(timestamp);
    }

    static before(baseDate: Date, checkedDate: Date) {
        return baseDate.getTime() < checkedDate.getTime();
    }

    static after(baseDate: Date, checkedDate: Date) {
        return baseDate.getTime() > checkedDate.getTime();
    }

    static addTimeToDate(initData: Date, value: number, type: TimeType): Date {
        return DateUtils.fromTimestamp(initData.getTime() + timeTypeToMilliseconds[type] * value);
    }

    static getMillisecondOfType(type: TimeType): number {
        return timeTypeToMilliseconds[type];
    }
}
