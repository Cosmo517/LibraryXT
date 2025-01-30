import React, {useState, useContext} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import api from '../../common/api.jsx'
import DataContext from '../Create.jsx';

export const CreateGenre = () => {
    const {tags, genres, bookcases, shelves, setTags, setGenres, setBookcases, setShelves} = useContext(DataContext);

    const [formData, setFormData] = useState({
        name: ''
    });

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
            newErrors.name = "Genre name cannot be blank";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            let response = null;
            try {
                response = await api.post('/genres/', formData);
            } catch (error) {
                toast.error("Error creating genre: ", error)
            }

            try {
                const getGenres = await api.get('/genres/');
                if (response.status == 200) {
                    setGenres(getGenres.data);
                }
            } catch (error) {
                console.error("Error getting genres:", error.message);
                toast.error("Error getting genres: " + error.message);
            }

            if (response.status == 200) {
                toast.success("Successfully created genre!");
                setFormData({
                    name: ''
                })
            }
        }
    }

    return (
        <div className="max-w-xl mt-8 p-4 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Create a Genre</h1>
            <form onSubmit={handleFormSubmit}>
            <label htmlFor='name' className='className="block text-gray-700 font-medium mb-2'>Genre Name:</label>
                <div className='mt-2'>
                    <input type='text' className='form-control border border-slate-300 px-4 py-2 rounded' id='name' name='name' value={formData.name} placeholder='Enter genre name' onChange={handleInputChange}/>
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <button type="submit" className='w-full bg-cyan-800 hover:bg-cyan-900 py-2 mt-2 rounded-md text-white'>Create</button>
            </form>
            <Toaster/>
        </div>
    )
}