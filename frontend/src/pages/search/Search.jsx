import { useGetBooks } from "./api/queries/useGetBooks"
import { Book } from "./components/Book";
import { useSearchParams, useNavigate } from "react-router-dom";

// TODO: Adjust so there is a submit button for the search
export const Search = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const page = parseInt(searchParams.get("page")) || 1;
    const search = searchParams.get("search") || "";
    const searchType = searchParams.get("searchType") || "Title";

    const { isPending, isError, error, data, isFetching } = useGetBooks({page, search, searchType})

    const handleFilterChange = (newSearch, newType) => {
        setSearchParams({ page: 1, search: newSearch, searchType: newType });
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        handleFilterChange(e.target.elements.search.value, e.target.elements["search-type"].value);
    }

    if (isFetching) return <p>Loading...</p>;

    return (
        <div className="flex flex-row h-96">
            <div className="w-80 border border-red-500 mx-4 mt-4">
                Filters
            </div>

            <div className="flex flex-col w-screen">
                <div className="h-20 mr-4 my-8">
                    <form onSubmit={handleFormSubmit} className="flex justify-center">
                        <select className="border border-gray-300 rounded-lg text-gray-700 bg-white pl-2 mr-1 focus:outline-none focus:ring-2 focus:ring-blue-500" id="search-type" key="search-type" defaultValue={searchType} name="search-type">
                            <option id={1} key={1} value="Title">Title</option>
                            <option id={2} key={2} value="Author">Author</option>
                            <option id={3} key={3} value="Genre">Genre</option>
                        </select>
                        
                        <input id="search" key="search" type="text" className="w-80 h-10 border border-r-4 border-gray-300" name="search" defaultValue={search}></input>

                        <button type="submit">Submit</button>
                    </form>
                </div>

                <div className="border border-red-500 mr-4">
                    {isError 
                    ? <p className="text-center text-xl">No books found</p> 
                    : (
                        <ul className="grid grid-cols-6 gap-y-2">

                            {data && data["books"]?.map((book) => (
                                <Book key={book.id} title={book.title} cover={book.cover}
                                spine={book.spine}
                                author={book.author} genre={book.genre}
                                publisher={book.publisher} page_count={book.page_count}
                                year_published={book.year_published} tags={book.tags}
                                isbn={book.isbn}/>
                            ))}
                        </ul>
                )}
                    
                    {data && (
                        <div className="flex justify-between">
                            <button className="ml-1" onClick={() => navigate(`?page=${page - 1}&search=${search}&type=${searchType}`)} disabled={page === 1}>
                                Previous
                            </button>

                            <button className="ml-auto mr-2" onClick={() => navigate(`?page=${page + 1}&search=${search}&type=${searchType}`)} disabled={!data["has_more"]}>
                                Next
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
