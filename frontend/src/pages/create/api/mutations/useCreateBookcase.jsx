import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from './../../../common/api';
import toast from 'react-hot-toast';

export function useCreateBookcase() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newBookcase) => {
            const response = await api.post("/bookshelf/",  newBookcase);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["bookcaseData"]);
            toast.success("Successfully created bookcase!");
        },
        onError: (error) => {
            toast.error("Error creating bookshelf: " + error.message);
        },
    });
}
