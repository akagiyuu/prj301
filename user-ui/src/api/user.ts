import { fetchWrapper, Pageable } from '.';
import { Book } from './book';

export type User = {
    username: string;
    avatarPath: string;
    fullName: string;
    hobbies: string;
    dob: Date;
    bio: string;
    createdAt: Date;
};

export type UserUpdateRequest = {
    avatar?: File;
    fullName?: string;
    hobbies?: string;
    dob?: Date;
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

export const update = async ({ avatar, ...values }: UserUpdateRequest) => {
    const formData = new FormData();

    if (avatar !== undefined) formData.append('avatarFile', avatar);
    formData.append(
        'updateUserRequest',
        new Blob([JSON.stringify(values)], {
            type: 'application/json',
        }),
    );

    const response = await fetchWrapper('user/update', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Request failed');
    }
};

type BookResponse = {
    totalPages: number;
    content: Book[];
};

export const postedBook = async (username: string, pageable: Pageable) => {
    const params = new URLSearchParams({
        username,
        page: pageable.page.toString(),
        size: pageable.size.toString(),
    });

    pageable.sort.forEach((sort) => params.append('sort', sort));

    const response = await fetchWrapper(`user/postedBook?${params.toString()}`);

    if (!response.ok) {
        throw new Error('Request failed');
    }

    return (await response.json()) as BookResponse;
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

export const report = async (username: string, reason: string) => {
    const response = await fetchWrapper(`user/${username}/report`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reason }),
    });

    if (!response.ok) {
        throw new Error('Request failed');
    }
};
