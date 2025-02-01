import { useQuery } from '@tanstack/react-query';
import api from '../../../common/api.jsx';

export function useGetShelves() {
    return useQuery({
        queryKey: ['shelvesData'],
        queryFn: async () => {
            const response = await api.get("/shelves/");
            return response.data
        }
    })
}