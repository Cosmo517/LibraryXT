import React, { useState, useEffect, useContext } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import api from '../../common/api.jsx'
import DataContext from '../Create.jsx';
import Multiselect from 'multiselect-react-dropdown'

export const CreateBook = () => {
    const {tags, genres, bookcases, shelves, setTags, setGenres, setBookcases, setShelves} = useContext(DataContext);

    const [formData, setFormData] = useState({
        isbn: '',
        title: '',
        author: '',
        publisher: '',
        page_count: '',
        year_published: '',
        tags: [],
        genre: '',
        bookcase: '',
        shelf: '',
        cover: '',
        spine: ''
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get("/genres/");
                if (response.status === 200) {
                    setGenres(response.data);
                }
            } catch (error) {
                toast.error("Failed to fetch genres: ", error.message);
            }

            try {
                const response = await api.get("/tags/");
                if (response.status === 200) {
                    setTags(response.data);
                }
            } catch (error) {
                toast.error("Failed to fetch tags: ", error.message);
            }

            try {
                const response = await api.get("/bookcases/");
                if (response.status === 200) { 
                    setBookcases(response.data);
                }
            } catch (error) {
                toast.error("Failed to fetch bookcases: ", error.message);
            }
            
            try {
                const response = await api.get("/shelves/");
                if (response.status === 200) {
                    setShelves(response.data);
                }
            } catch (error) {
                toast.error("Failed to fetch shelves: ", error.message);
            }
        };
    
        fetchData(); // Call the async function
    }, []);

    const [errors, setErrors] = useState({});

    // handle any input change for the formData
    const handleInputChange = (event) => {
        const value = event.target.value;
        setFormData({
            ...formData,
            [event.target.name]: value,
        });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = "Tag name cannot be blank";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            try {
                let response = await api.post('/tags/', formData);
            } catch (error) {
                toast.error("Error creating tag: ", error)
            }
            if (response.status == 200) {
                toast.success("Successfully created tag!");
                setFormData({
                    name: ''
                })
            }
        }
    }

    const onSelect = (selectedList, selectedItem) => {
        setFormData((prevData) => ({
            ...prevData,
            tags: selectedList.map((tag) => tag.name),
        }));
    };
    
    const onRemove = (selectedList, removedItem) => {
        setFormData((prevData) => ({
            ...prevData,
            tags: selectedList.map((tag) => tag.name),
        }));
    };

    return (
        <div className="max-w-xl mt-8 p-4 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Create a Book</h1>
            <form onSubmit={handleFormSubmit}>
                <div className='mt-2 flex flex-col'>
                    <label htmlFor='isbn' className='className="block text-gray-700 font-medium mb-2'>Book ISBN:</label>
                    <input type='text' className='form-control border border-slate-300 rounded px-4 py-2' id='isbn' name='isbn' value={formData.isbn} placeholder='Enter ISBN here' onChange={handleInputChange}/>
                    
                    <label htmlFor='title' className='className="block text-gray-700 font-medium mb-2'>Title:</label>
                    <input type='text' className='form-control border border-slate-300 rounded px-4 py-2' id='title' name='title' value={formData.title} placeholder='Enter title here' onChange={handleInputChange}/>
                    
                    <label htmlFor='author' className='className="block text-gray-700 font-medium mb-2'>Author:</label>
                    <input type='text' className='form-control border border-slate-300 rounded px-4 py-2' id='author' name='author' value={formData.author} placeholder='Enter author here' onChange={handleInputChange}/>
                    
                    <label htmlFor='publisher' className='className="block text-gray-700 font-medium mb-2'>Publisher:</label>
                    <input type='text' className='form-control border border-slate-300 rounded px-4 py-2' id='publisher' name='publisher' value={formData.publisher} placeholder='Enter publisher here' onChange={handleInputChange}/>
                    
                    <label htmlFor='page_count' className='className="block text-gray-700 font-medium mb-2'>Page Count:</label>
                    <input type='text' className='form-control border border-slate-300 rounded px-4 py-2' id='page_count' name='page_count' value={formData.page_count} placeholder='Enter page count here' onChange={handleInputChange}/>
                    
                    <label htmlFor='year_published' className='className="block text-gray-700 font-medium mb-2'>Year Published:</label>
                    <input type='text' className='form-control border border-slate-300 rounded px-4 py-2' id='year_published' name='year_published' value={formData.year_published} placeholder='Enter year published here' onChange={handleInputChange}/>
                    
                    <label htmlFor='tags' className='className="block text-gray-700 font-medium mb-2'>Tags:</label>
                    <Multiselect
                    options={tags}
                    onSelect={onSelect}
                    onRemove={onRemove}
                    displayValue="name"
                    placeholder="Choose tags"
                    style={{
                        multiselectContainer: { border: "1px solid #d1d5db" },
                        searchBox: { borderRadius: "0.375rem", padding: "0.5rem" },
                    }}
                    />
                    
                    <label htmlFor='genre' className='className="block text-gray-700 font-medium mb-2'>Genre:</label>
                    <select
                        className="form-control border border-slate-300 rounded px-4 py-2"
                        id="genre"
                        name="genre"
                        value={formData.genre}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>
                            Select a genre
                        </option>
                        {genres.map((genre) => (
                            <option key={genre.id} value={genre.name}>
                                {genre.name}
                            </option>
                        ))}
                    </select>      

                    <label htmlFor='bookcase' className='className="block text-gray-700 font-medium mb-2'>Bookcase:</label>
                    <select
                        className="form-control border border-slate-300 rounded px-4 py-2"
                        id="bookcase"
                        name="bookcase"
                        value={formData.bookcase}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>
                            Select a bookcase
                        </option>
                        {bookcases.map((bookcase) => (
                            <option key={bookcase.id} value={bookcase.id}>
                                {bookcase.bookcase_name}
                            </option>
                        ))}
                    </select>
                    
                    <label htmlFor='shelf' className='className="block text-gray-700 font-medium mb-2'>Shelf:</label>
                    <select
                        className="form-control border border-slate-300 rounded px-4 py-2"
                        id="shelf"
                        name="shelf"
                        value={formData.shelf}
                        onChange={handleInputChange}
                    >
                        <option value="" disabled>
                            Select a shelf
                        </option>
                        {shelves.map((shelf) => (
                            shelf.bookcase_id == formData.bookcase ? <option key={shelf.id} value={shelf.shelf_name}>
                                {shelf.shelf_name}
                            </option> 
                            : null
                        ))}
                    </select>

                    <label htmlFor='cover' className='className="block text-gray-700 font-medium mb-2'>Cover:</label>
                    <input type='file' className='form-control border border-slate-300 rounded px-4 py-2' id='cover' name='cover' value={formData.cover} placeholder='Enter book name' onChange={handleInputChange}/>
                    
                    <label htmlFor='spine' className='className="block text-gray-700 font-medium mb-2'>Spine:</label>
                    <input type='file' className='form-control border border-slate-300 rounded px-4 py-2' id='name' name='spine' value={formData.spine} placeholder='Enter book name' onChange={handleInputChange}/>
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <button type="submit" className='w-full bg-cyan-800 hover:bg-cyan-900 py-2 mt-2 rounded-md text-white'>Create</button>
            </form>
            <Toaster/>
        </div>
    )
}