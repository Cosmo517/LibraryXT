import React, {useContext, useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import api from '../../common/api.jsx'
import DataContext from '../Create.jsx';

export const CreateTag = () => {
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
            newErrors.name = "Tag name cannot be blank";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            let response = null;
            try {
                response = await api.post('/tags/', formData);
            } catch (error) {
                toast.error("Error creating tag: ", error)
            }

            try {
                const getTags = await api.get('/tags/');
                if (response.status == 200) {
                    setTags(getTags.data);
                }
            } catch (error) {
                console.error("Error getting tags:", error.message);
                toast.error("Error getting tags: " + error.message);
            }

            if (response.status == 200) {
                toast.success("Successfully created tag!");
                setFormData({
                    name: ''
                })
            }
        }
    }

    return (
        <div className="max-w-xl mt-8 p-4 bg-white rounded shadow-md">
            <h1 className="text-2xl font-bold mb-4 text-center">Create a Tag</h1>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor='name' className='className="block text-gray-700 font-medium mb-2'>Tag Name:</label>
                <div className='mt-2'>
                    <input type='text' className='form-control border border-slate-300 rounded px-4 py-2' id='name' name='name' value={formData.name} placeholder='Enter tag name' onChange={handleInputChange}/>
                    {errors.name && <p className="text-red-500">{errors.name}</p>}
                </div>
                <button type="submit" className='w-full bg-cyan-800 hover:bg-cyan-900 py-2 mt-2 rounded-md text-white'>Create</button>
            </form>
            <Toaster/>
        </div>
    )
}