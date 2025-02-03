import { useState } from "react";
import { GetBooks } from "./components/GetBooks"

export const Search = () => {
    const [page, setPage] = useState(1)
    const { isPending, isError, error, data, isFetching } = GetBooks(1);

    // if (isPending || isFetching) return <p>Loading...</p>;
    // if (isError) return <p>Error: {error.message}</p>;

    return (
        <div className="h-96">
            <h1>Books</h1>
            <ul>
                {data?.map((book) => (
                    <li key={book.id}>
                        <h1>{book.title}</h1>
                        <img src={'data:image/png;base64,' + book.cover}></img>
                    </li>
                ))}
            </ul>
            <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))} disabled={page === 1}>
                Previous
            </button>
            <button onClick={() => setPage((prev) => prev + 1)}>
                Next
            </button>
        </div>
    )
}