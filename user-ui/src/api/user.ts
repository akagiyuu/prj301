import { fetchWrapper } from '.';

export type User = {
    avatarPath: string;
    fullName: string;
    hobbies: string;
    dob: string;
    bio: string;
};

export type Self = { username: string } & User;

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

    return (await response.json()) as Self;
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
