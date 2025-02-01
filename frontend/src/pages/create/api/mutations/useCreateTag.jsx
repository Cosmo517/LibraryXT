import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from './../../../common/api';
import toast from 'react-hot-toast';

export function useCreateTag() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newTag) => {
            const response = await api.post("/tags/", newTag);
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["tagData"]);
            toast.success("Successfully created tag!");
        },
        onError: (error) => {
            toast.error("Error creating tag: " + error.message);
        },
    });
}
