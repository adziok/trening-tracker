/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable @typescript-eslint/no-unsafe-assignment
import axios, { AxiosResponse } from 'axios';

// Shame on me, one day I will refactor this code :))))) Promise<>

const baeUrl = 'http://localhost:3000/';

const refreshToken = () => {
    return axios
        .post<{ accessToken: string }>(baeUrl + 'auth/refresh', {
            refreshToken: localStorage.getItem('refreshToken'),
        })
        .then((res: AxiosResponse<{ accessToken: string }, any>) => {
            localStorage.setItem('accessToken', res.data.accessToken);
            return res.data;
        });
};

const axiosApiInstance = axios.create({
    baseURL: baeUrl,
});

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(
    (config) => {
        const accessToken = localStorage.getItem('accessToken') || '';
        config.headers = {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/json',
        };
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for API calls
axiosApiInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error: any) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const originalRequest = error.config;
        if (error.response.status === 403 && !originalRequest._retry) {
            originalRequest._retry = true;
            const { accessToken } = await refreshToken();
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + accessToken;
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
            return axiosApiInstance(originalRequest);
        }
        return Promise.reject(error);
    }
);

export const fetchBackendWithAuthorization = {
    get: (
        url: string,
        opts?: { headers?: Record<string, string | number>; queryParams?: Record<string, string | number> }
    ) => {
        return (
            axiosApiInstance
                .get(`${baeUrl}${url}`, {
                    headers: opts?.headers,
                    params: opts?.queryParams,
                })
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                .then(({ data }) => data)
        );
    },
    post: (
        url: string,
        opts?: {
            body?: Record<string, any>;
            headers?: Record<string, string | number>;
            queryParams?: Record<string, string | number>;
        }
    ) => {
        return (
            axiosApiInstance
                .post(url, opts?.body, {
                    headers: opts?.headers,
                    params: opts?.queryParams,
                })
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                .then(({ data }) => data)
        );
    },
    put: (
        url: string,
        opts?: {
            body?: Record<string, any>;
            headers?: Record<string, string | number>;
            queryParams?: Record<string, string | number>;
        }
    ) => {
        return (
            axiosApiInstance
                .put(url, opts?.body, {
                    headers: opts?.headers,
                    params: opts?.queryParams,
                })
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                .then(({ data }) => data)
        );
    },
    patch: (
        url: string,
        opts?: {
            body?: Record<string, any>;
            headers?: Record<string, string | number>;
            queryParams?: Record<string, string | number>;
        }
    ) => {
        return (
            axiosApiInstance
                .patch(url, opts?.body, {
                    headers: opts?.headers,
                    params: opts?.queryParams,
                })
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                .then(({ data }) => data)
        );
    },
    delete: (
        url: string,
        opts?: {
            headers?: Record<string, string | number>;
            queryParams?: Record<string, string | number>;
        }
    ) => {
        return (
            axiosApiInstance
                .delete(url, {
                    headers: opts?.headers,
                    params: opts?.queryParams,
                })
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                .then(({ data }) => data)
        );
    },
};
