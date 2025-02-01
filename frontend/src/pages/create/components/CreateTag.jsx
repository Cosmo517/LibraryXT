import React, { useState } from 'react'
import { Toaster } from 'react-hot-toast';
import { useCreateTag } from '../api/mutations/useCreateTag.jsx'

export const CreateTag = () => {

    const [formData, setFormData] = useState({
        name: ''
    });

    const [errors, setErrors] = useState({});

    const createTagMutation = useCreateTag();

    // handle any input change for the formData
    const handleInputChange = (event) => {
        const value = event.target.value;
        setFormData({
            ...formData,
            [event.target.name]: value,
        });
    };

    const handleFormSubmit = (event) => {
        event.preventDefault();
        
        const newErrors = {};

        if (!formData.name) {
            newErrors.name = "Tag name cannot be blank";
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            createTagMutation.mutate(formData, {
                onSuccess: () => {
                    setFormData({ name: '' })
                },
            });
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