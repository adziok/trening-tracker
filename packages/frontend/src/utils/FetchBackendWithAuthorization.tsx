import * as querystring from 'query-string';

export const fetchBackendWithAuthorization = {
    get: (
        url: string,
        opts?: { headers?: Record<string, string | number>; queryParams?: Record<string, string | number> }
    ) => {
        const queryParams = (opts?.queryParams && `?${querystring.stringify(opts.queryParams)}`) || '';

        return fetch(`${url}${queryParams}`, {
            method: 'GET',
            headers: { Authorization: `Bearer ${localStorage.getItem('accessToken') || ''}` },
        }).then((res) => res.json());
    },
};
