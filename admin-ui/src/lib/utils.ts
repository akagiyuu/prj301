import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const fetchWithAuth = (url: RequestInfo | URL, init?: RequestInit) => {
    return fetch(url, {
        ...init,
        headers: {
            Authorization: 'Bearer eyJhbGciOiJFUzI1NiJ9.eyJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3NDE1NzY1NzIsImV4cCI6MTc0MjE4MTM3Mn0.OwmYwkpVUNYcLEfoR3r-TK0EaYL1iK8QzxY5wv8ie0RKSgMQ00uv_fISIHH-dt0_irs-bN1hDc28d2d25ffCPg',
            ...init?.headers,
        },
    });
};
