import { fetchWrapper } from '.';
import { Book } from './book';

export type User = {
    username: string;
    avatarPath: string;
    fullName: string;
    hobbies: string;
    dob: string;
    bio: string;
};

type UserUpdateRequest = {
    avatarPath?: string;
    fullName?: string;
    hobbies?: string;
    dob?: string;
    bio?: string;
};

export const self = async () => {
    const response = await fetchWrapper('user/self');

    if (!response.ok) {
        throw new Error('Request failed');
    }

    return (await response.json()) as User;
};

export const find = async (username: string) => {
    const params = new URLSearchParams({
        username,
    });

    const response = await fetchWrapper(`user/find?${params.toString()}`);

    if (!response.ok) {
        throw new Error('Request failed');
    }

    return (await response.json()) as User;
};

export const update = async (values: UserUpdateRequest) => {
    const response = await fetchWrapper('user/update', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
    });

    if (!response.ok) {
        throw new Error('Request failed');
    }
};

export const postedBook = async (username: string) => {
    const params = new URLSearchParams({
        username,
    });

    const response = await fetchWrapper(`user/postedBook?${params.toString()}`);

    if (!response.ok) {
        throw new Error('Request failed');
    }

    return (await response.json()) as Book[];
};

export const countComment = async (username: string) => {
    const params = new URLSearchParams({
        username,
    });

    const response = await fetchWrapper(
        `user/countComment?${params.toString()}`,
    );

    if (!response.ok) {
        throw new Error('Request failed');
    }

    return Number(await response.text());
};
