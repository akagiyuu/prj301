const USER_API_URL =
    import.meta.env.USER_API_URl ?? 'http://localhost:3000/api/v1';

export const fetchWrapper = (url: RequestInfo | URL, init?: RequestInit) => {
    const token = localStorage.getItem('token');

    return fetch(`${USER_API_URL}/${url}`, {
        ...init,
        headers: {
            Authorization: token === null ? '' : `Bearer ${token}`,
            ...init?.headers,
        },
    });
};

export type Pageable = {
    page: number;
    size: number;
    sort: string[];
};

export * as auth from './auth';
export * as book from './book';
export * as genre from './genre';
export * as user from './user';
export * as comment from './comment';
