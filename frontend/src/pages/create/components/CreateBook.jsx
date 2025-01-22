import React, {useState} from 'react'
import toast, { Toaster } from 'react-hot-toast';
import api from '../../common/api.jsx'

export const CreateBook = () => {
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

    return (
        <div className="max-w-xl mt-8 p-4 bg-white rounded shadow-md">
            <h1 className="font-semibold text-xl">Create a Book</h1>
            <form onSubmit={handleFormSubmit} className='py-4'>
                <div>
                    <input type='text' className='form-control border border-black ml-2' id='name' name='name' value={formData.name} placeholder=' Tag name' onChange={handleInputChange}/>
                    {errors.name && <p className="error">{errors.name}</p>}
                </div>
                <button type="submit" className='bg-cyan-700 px-7 py-2 mt-2 rounded-lg text-white'>Create</button>
            </form>
            <Toaster/>
        </div>
    )
}