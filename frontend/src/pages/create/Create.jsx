import { CreateBook } from "./components/CreateBook"
import { CreateBookshelf } from "./components/CreateBookshelf"
import { CreateTag } from "./components/CreateTag"
import { CreateGenre } from "./components/CreateGenre"

export const Create = () => {
    return (
        <div className="flex justify-around">
            <CreateTag/>
            <CreateGenre/>
            <CreateBook/>
            <CreateBookshelf/>
        </div>
    )
}