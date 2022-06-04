/* eslint-disable @typescript-eslint/no-unsafe-member-access */
// eslint-disable @typescript-eslint/no-unsafe-assignment
import axios, { AxiosResponse } from 'axios';
import { axiosResponseDateTransformer } from './axiosResponseDateTransformer';

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
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        response.data = axiosResponseDateTransformer(response.data);
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
    get: <ResponseType,>(
        url: string,
        opts?: { headers?: Record<string, string | number>; queryParams?: Record<string, string | number> }
    ) => {
        return (
            axiosApiInstance
                .get<ResponseType>(url, {
                    headers: opts?.headers,
                    params: opts?.queryParams,
                })
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                .then(({ data }) => data)
        );
    },
    post: <ResponseType, BodyType>(
        url: string,
        opts?: {
            body?: BodyType;
            headers?: Record<string, string | number>;
            queryParams?: Record<string, string | number>;
        }
    ) => {
        return (
            axiosApiInstance
                .post<ResponseType, AxiosResponse<ResponseType>, BodyType>(url, opts?.body, {
                    headers: opts?.headers,
                    params: opts?.queryParams,
                })
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                .then(({ data }) => data)
        );
    },
    put: <ResponseType, BodyType>(
        url: string,
        opts?: {
            body?: BodyType;
            headers?: Record<string, string | number>;
            queryParams?: Record<string, string | number>;
        }
    ) => {
        return (
            axiosApiInstance
                .put<ResponseType, AxiosResponse<ResponseType>, BodyType>(url, opts?.body, {
                    headers: opts?.headers,
                    params: opts?.queryParams,
                })
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                .then(({ data }) => data)
        );
    },
    patch: <ResponseType, BodyType>(
        url: string,
        opts?: {
            body?: BodyType;
            headers?: Record<string, string | number>;
            queryParams?: Record<string, string | number>;
        }
    ) => {
        return (
            axiosApiInstance
                .patch<ResponseType, AxiosResponse<ResponseType>, BodyType>(url, opts?.body, {
                    headers: opts?.headers,
                    params: opts?.queryParams,
                })
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                .then(({ data }) => data)
        );
    },
    delete: <ResponseType,>(
        url: string,
        opts?: {
            headers?: Record<string, string | number>;
            queryParams?: Record<string, string | number>;
        }
    ) => {
        return (
            axiosApiInstance
                .delete<ResponseType>(url, {
                    headers: opts?.headers,
                    params: opts?.queryParams,
                })
                // eslint-disable-next-line @typescript-eslint/no-unsafe-return
                .then(({ data }) => data)
        );
    },
};
