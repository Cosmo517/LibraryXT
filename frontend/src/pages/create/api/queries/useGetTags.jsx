import { useQuery } from '@tanstack/react-query';
import api from '../../../common/api.jsx';

export function useGetTags() {
    return useQuery({
        queryKey: ['tagData'],
        queryFn: async () => {
            const response = await api.get("/tags/");
            return response.data;
        }
    });
}
