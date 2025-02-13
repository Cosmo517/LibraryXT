import { keepPreviousData, useQuery } from '@tanstack/react-query';
import api from '../../../common/api.jsx';

export function useGetBooks({page, search, searchType}) {

    return useQuery({
        queryKey: ['bookData', page, search, searchType],
        queryFn: async () => {
            const response = await api.get(`/books/`, { params: { page, search, searchType } });

            return response.data;
        },
        retry: false,
        keepPreviousData: true,
        enabled: !!page
    });
}