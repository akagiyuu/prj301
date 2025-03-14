import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

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

export const logout = () => {
    localStorage.removeItem('token');
};
