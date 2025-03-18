import { fetchWrapper } from '.';

export type Book = {
    id: string;
    isbn: string;
    postedUser: string;
    title: string;
    coverPath: string;
    authors: string[];
    genres: string[];
    publicationDate: string;
    summary: string;
    pdfPath: string;
    view: number;
    rate: number;
};

export type Comment = {
    id: string;
    username: string;
    content: string;
    createdAt: string;
};

type Pageable = {
    page: number;
    size: number;
    sort: string[];
};

type SearchRequest = {
    query?: string;
    genres?: string[];
    pageable: Pageable;
};

type SearchResponse = {
    totalPages: number;
    content: Book[];
};

type UploadBookRequest = {
    isbn: string;
    title: string;
    authors: string[];
    genres: string[];
    publicationDate: string;
    summary: string;
};

export const search = async ({ query, genres, pageable }: SearchRequest) => {
    const params = new URLSearchParams({
        page: pageable.page.toString(),
        size: pageable.size.toString(),
    });

    pageable.sort.forEach((sort) => params.append('sort', sort));

    if (query !== undefined) {
        params.set('query', query);
    }

    if (genres !== undefined) {
        genres.forEach((genre) => params.append('genres', genre));
    }

    const response = await fetchWrapper(`book?${params}`);

    if (!response.ok) {
        throw new Error('Request failed');
    }

    return (await response.json()) as SearchResponse;
};

export const get = async (id: string) => {
    const response = await fetchWrapper(`book/${id}`);

    if (!response.ok) {
        throw new Error('Request failed');
    }

    return (await response.json()) as Book;
};

export const getComment = async (id: string) => {
    const response = await fetchWrapper(`book/${id}/comment`);

    if (!response.ok) {
        throw new Error('Request failed');
    }

    return (await response.json()) as Comment[];
};

export const uploadBook = async (
    values: UploadBookRequest,
    coverFile: File,
    pdfFile: File,
) => {
    const formData = new FormData();

    formData.append('coverFile', coverFile);
    formData.append('pdfFile', pdfFile);
    formData.append(
        'uploadBookRequest',
        new Blob([JSON.stringify(values)], {
            type: 'application/json',
        }),
    );

    const response = await fetchWrapper('book', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Request failed');
    }
};

export const rate = async (id: string, rating: number) => {
    const response = await fetchWrapper(`book/${id}/rating`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            rating,
        }),
    });

    if (!response.ok) {
        throw new Error('Request failed');
    }

    return (await response.json()) as Book;
};

export const comment = async (id: string, content: string) => {
    const response = await fetchWrapper(`book/${id}/comment`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content,
        }),
    });

    if (!response.ok) {
        throw new Error('Request failed');
    }

    return (await response.json()) as Book;
};
