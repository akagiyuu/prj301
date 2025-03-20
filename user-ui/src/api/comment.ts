import { fetchWrapper } from '.';

export const report = async (id: string, reason: string) => {
    const response = await fetchWrapper(`comment/${id}/report`, {
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
