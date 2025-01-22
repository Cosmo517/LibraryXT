import React, { useState } from "react";

export const CreateBookshelf = () => {
    const [bookcaseName, setBookcaseName] = useState(""); // Bookcase name
    const [shelfCount, setShelfCount] = useState(""); // Number of shelves
    const [shelves, setShelves] = useState([]); // Array of shelf names
    const [error, setError] = useState("");

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
        setShelves(Array.from({ length: parseInt(shelfCount) }, () => ""));
    };

    const handleShelfNameChange = (index, value) => {
        const updatedShelves = [...shelves];
        updatedShelves[index] = value;
        setShelves(updatedShelves);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!bookcaseName) {
        setError("Please provide a name for the bookcase.");
        return;
        }
        if (shelves.some((shelf) => !shelf)) {
        setError("Please name all shelves before submitting.");
        return;
        }
        setError("");
        console.log({ bookcaseName, shelfCount, shelves });
        alert("Bookcase submitted successfully!");
        setBookcaseName("");
        setShelfCount("");
        setShelves([]);
    };

    return (
        <div className="max-w-xl mt-8 p-4 bg-white rounded shadow-md">

        <h1 className="text-2xl font-bold mb-4 text-center">Create a Bookshelf</h1>

        <form onSubmit={handleSubmit}>
            {/* Input for bookcase name */}
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
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            </div>

            {/* Input for number of shelves */}
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
                className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="button"
                onClick={generateShelfInputs}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Set Shelves
            </button>
            </div>

            {/* Error Message */}
            {error && <p className="text-red-500 mb-4">{error}</p>}

            {/* Inputs for shelf names */}
            {shelves.length > 0 && (
            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Name Your Shelves:</h2>
                {shelves.map((shelf, index) => (
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
                    className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                ))}
            </div>
            )}

            {/* Submit Button */}
            {shelves.length > 0 && (
            <button
                type="submit"
                className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            >
                Submit Bookcase
            </button>
            )}
        </form>
        </div>
    );
};