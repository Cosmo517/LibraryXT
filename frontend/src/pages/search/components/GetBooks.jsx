import { keepPreviousData, useQuery } from '@tanstack/react-query';
import api from '../../common/api.jsx';

export function GetBooks(page) {
    return useQuery({
        queryKey: ['bookData', page],
        queryFn: async () => {
            const response = await api.get(`/books/?page=${page}`);
            return response.data
        },
        placeholderData: keepPreviousData,
        enabled: !!page 
    })
}