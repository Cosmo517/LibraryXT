import { useQuery } from '@tanstack/react-query';
import api from '../../../common/api.jsx';

export function useGetBookcases() {
    return useQuery({
        queryKey: ['bookcaseData'],
        queryFn: async () => {
            const response = await api.get("/bookcases/");
            return response.data
        }
    })
}