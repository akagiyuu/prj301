import { fetchWrapper } from '.';

export const get = async () => {
    const response = await fetchWrapper(`genre/all`);

    if (!response.ok) {
        throw new Error('Request failed');
    }

    return (await response.json()) as string[];
};
