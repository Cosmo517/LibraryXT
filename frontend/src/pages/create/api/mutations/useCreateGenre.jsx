import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from './../../../common/api';
import toast from 'react-hot-toast';

export function useCreateGenre() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newGenre) => {
            const response = await api.post("/genres/", newGenre);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["genreData"]);
            toast.success("Successfully created genre!");
        },
        onError: (error) => {
            toast.error("Error creating genre: " + error.message);
        },
    });
}
