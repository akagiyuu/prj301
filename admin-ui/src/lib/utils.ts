import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const fetchWithAuth = (url: RequestInfo | URL, init?: RequestInit) => {
    const token = localStorage.getItem('token');

    if (token === null) return null;

    return fetch(url, {
        ...init,
        headers: {
            Authorization: `Bearer ${token}`,
            ...init?.headers,
        },
    });
};
