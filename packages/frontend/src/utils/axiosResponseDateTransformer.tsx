/* eslint-disable @typescript-eslint/no-unsafe-return */
import { AxiosRequestTransformer } from 'axios';
import dayjs from 'dayjs';

export const axiosResponseDateTransformer: AxiosRequestTransformer = (data) => {
    if (typeof data === 'string' && dayjs(data).isValid()) {
        return dayjs(data).toDate();
    }
    if (Array.isArray(data)) {
        return data.map((val: any) => axiosResponseDateTransformer(val));
    }
    if (typeof data === 'object' && data !== null) {
        return Object.fromEntries(
            Object.entries(data as Record<string, unknown>).map(([key, val]) => [
                key,
                axiosResponseDateTransformer(val),
            ])
        );
    }
    return data;
};
