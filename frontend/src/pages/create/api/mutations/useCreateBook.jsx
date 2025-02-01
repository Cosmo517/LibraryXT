import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from './../../../common/api';
import toast from 'react-hot-toast';

export function useCreateBook() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (newBook) => {
            const response = await api.post("/books/", newBook, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["bookData"]);
            toast.success("Successfully created book!");
        },
        onError: (error) => {
            toast.error("Error creating book: " + error.message);
        },
    });
}
