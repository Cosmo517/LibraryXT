
// TODO: Should be able to create a bookcase
// TODO: Should be able to create a tag
// TODO: Should be able to create a Genre
// TODO: Should be able to create a book

import { CreateBook } from "./components/CreateBook"
import { CreateBookshelf } from "./components/CreateBookshelf"
import { CreateTag } from "./components/CreateTag"
import { CreateGenre } from "./components/CreateGenre"

export const Create = () => {
    return (
        <div className="flex justify-evenly">
            <CreateTag/>
            <CreateGenre/>
            <CreateBook/>
            <CreateBookshelf/>
        </div>
    )
}