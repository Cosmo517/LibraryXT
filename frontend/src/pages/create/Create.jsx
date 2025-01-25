// TODO: Should be able to create a book

import { CreateBook } from "./components/CreateBook"
import { CreateBookshelf } from "./components/CreateBookshelf"
import { CreateTag } from "./components/CreateTag"
import { CreateGenre } from "./components/CreateGenre"
import { useState, createContext } from "react";

const DataContext = createContext({
    tags: [],
    genres: [],
    bookcases: [],
    shelves: [],
    setTags: () => {},
    setGenres: () => {},
    setBookcases: () => {},
    setShelves: () => {},
});

export default DataContext;

export const Create = () => {
    const [tags, setTags] = useState([]);
    const [genres, setGenres] = useState([]);
    const [bookcases, setBookcases] = useState([]);
    const [shelves, setShelves] = useState([]);

    const value = {tags, genres, bookcases, shelves, setTags, setGenres, setBookcases, setShelves};

    return (
        <div className="flex justify-evenly">
            <DataContext.Provider value={value}>
                <CreateTag/>
                <CreateGenre/>
                <CreateBook/>
                <CreateBookshelf/>
            </DataContext.Provider>
        </div>
    )
}