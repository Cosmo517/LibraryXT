import React, { useState, useContext } from "react";
import toast, { Toaster } from 'react-hot-toast';
import api from '../../common/api.jsx'
import DataContext from '../Create.jsx';

export const CreateBookshelf = () => {
    const [bookcaseName, setBookcaseName] = useState("");
    const [shelfCount, setShelfCount] = useState("");
    const [shelvesState, setShelvesState] = useState([]);
    const [error, setError] = useState("");
    const {tags, genres, bookcases, shelves, setTags, setGenres, setBookcases, setShelves} = useContext(DataContext);


    const handleShelfCountChange = (e) => {
        const value = e.target.value;
        if (value === "" || /^[0-9]+$/.test(value)) {
            setShelfCount(value);
        }
    };

    const generateShelfInputs = () => {
        if (!shelfCount || shelfCount <= 0) {
            setError("Please enter a valid number of shelves.");
            return;
        }
        setError("");
        setShelvesState(Array.from({ length: parseInt(shelfCount) }, () => ""));
    };

    const handleShelfNameChange = (index, value) => {
        const updatedShelves = [...shelvesState];
        updatedShelves[index] = value;
        setShelvesState(updatedShelves);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!bookcaseName) {
            setError("Please provide a name for the bookcase.");
            return;
        }

        if (shelvesState.some((shelf) => !shelf)) {
            setError("Please name all shelves before submitting.");
            return;
        }

        const form = {
            bookcase_name: bookcaseName,
            shelves: shelvesState.map(shelf => ({ shelf_name: shelf })),
        };


        let response = null;
        try {
            response = await api.post('/bookshelf/', form);
            if (response.status == 200) {
                toast.success("Successfully created bookcase!");
                setError("");
                setBookcaseName("");
                setShelfCount("");
                setShelvesState([]);
            }
        } catch (error) {
            toast.error("Error creating bookcase: ", error.message)
        }

        // Grab all bookcase data and shelf data
        try {
            const getBookcases = await api.get('/bookcases/');
            const getShelves = await api.get("/shelves/")
            if (response.status == 200) {
                setBookcases(getBookcases.data);
                setShelves(getShelves.data)
            }
        } catch (error) {
            console.error("Error getting bookcases or shelves:", error.message);
            toast.error("Error getting bookcases shelves: " + error.message);
        }

    };

    return (
        <div className="max-w-xl mt-8 p-4 bg-white rounded shadow-md">

        <h1 className="text-2xl font-bold mb-4 text-center">Create a Bookcase</h1>

        <form onSubmit={handleSubmit}>
            <div className="mb-4">
            <label htmlFor="bookcaseName" className="block text-gray-700 font-medium mb-2">
                Bookcase Name:
            </label>
            <input
                id="bookcaseName"
                type="text"
                value={bookcaseName}
                onChange={(e) => setBookcaseName(e.target.value)}
                placeholder="Enter the bookcase name"
                className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            <div className="mb-4">
            <label htmlFor="shelfCount" className="block text-gray-700 font-medium mb-2">
                Number of Shelves:
            </label>
            <input
                id="shelfCount"
                type="text"
                value={shelfCount}
                onChange={handleShelfCountChange}
                placeholder="Enter the number of shelves"
                className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="button"
                onClick={generateShelfInputs}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Set Shelves
            </button>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            {shelvesState.length > 0 && (
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Name Your Shelves:</h2>
                {shelvesState.map((shelf, index) => (
                <div key={index} className="mb-2">
                    <label htmlFor={`shelf-${index}`} className="block text-gray-700 font-medium">
                    Shelf {index + 1} Name:
                    </label>
                    <input
                    id={`shelf-${index}`}
                    type="text"
                    value={shelf}
                    onChange={(e) => handleShelfNameChange(index, e.target.value)}
                    placeholder={`Enter name for Shelf ${index + 1}`}
                    className="w-full px-3 py-2 border border-slate-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                ))}
            </div>
            )}

            {shelvesState.length > 0 && (
            <button
                type="submit"
                className="w-full px-4 py-2 bg-cyan-800 hover:bg-cyan-900 text-white rounded"
            >
                Submit Bookcase
            </button>
            )}
        </form>
        <Toaster/>
        </div>
    );
};