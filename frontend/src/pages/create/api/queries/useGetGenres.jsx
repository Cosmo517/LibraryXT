import { useQuery } from '@tanstack/react-query';
import api from '../../../common/api.jsx';

export function useGetGenres() {
    return useQuery({
        queryKey: ['genreData'],
        queryFn: async () => {
            const response = await api.get("/genres/");
            return response.data
        }
    })
}