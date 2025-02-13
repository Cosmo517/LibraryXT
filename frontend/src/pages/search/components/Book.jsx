export const Book = (props) => {
    return (
        <div className="max-w-44 h-64 border border-black border-r-2">
            <h1 className='text-center text-xl'>{props.title}</h1>
            <img src={'data:image/png;base64,' + props.cover}></img>
        </div>
    )
}