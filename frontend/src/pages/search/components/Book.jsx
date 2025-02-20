import { useState } from "react"
import { BookModal } from "./BookModal"

export const Book = (props) => {
    const [modalOpen, setModalOpen] = useState(false)
    return (
        <button onClick={() => setModalOpen(true)} className="max-w-44 h-64 border border-black border-r-2">
            <div className="max-w-44 h-64">
                <h1 className='text-center text-xl'>{props.title}</h1>
                <img src={'data:image/png;base64,' + props.cover}></img>
                {modalOpen && props && <BookModal title={props.title} onClose={() => setModalOpen(false)} />}
            </div>
        </button>

    )
}
