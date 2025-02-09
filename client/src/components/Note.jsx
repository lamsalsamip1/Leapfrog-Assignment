import React, { useState, useEffect } from 'react';
import Button from '../components/Button'; // Assuming Button component is already available
import { addNote, editNote, deleteNote } from '../services/NoteFunctions';



const Note = ({ onClose, categories, existingNote, onNoteCallback }) => {

    const [selectedCategories, setSelectedCategories] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const [message, setMessage] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
        if (existingNote) {
            setTitle(existingNote.title);
            setContent(existingNote.content);
            setSelectedCategories(existingNote.Categories.map(category => category.category_name));
        }
    }, [existingNote]);

    const handleCategoryChange = (categoryName) => {
        setSelectedCategories((prevSelectedCategories) =>
            prevSelectedCategories.includes(categoryName)
                ? prevSelectedCategories.filter((name) => name !== categoryName)
                : [...prevSelectedCategories, categoryName]
        );
    };

    const handleSave = async () => {

        //check if title or content is empty
        if (!title || !content) {
            setMessage('Title and content are required');
            setError(true);
            return;
        }

        // send title, content, and array of categoryIDs to the API
        const category_ids = categories
            .filter((category) => selectedCategories.includes(category.category_name))
            .map((category) => category.category_id);

        try {
            let response;
            if (existingNote) {
                response = await editNote({
                    note_id: existingNote.note_id,
                    title: title,
                    content: content,
                    categoryIDs: category_ids
                });

                if (response.success) {
                    setMessage("Note updated successfully");
                    setError(false);
                    setTitle(title);
                    setContent(content);
                    setSelectedCategories(selectedCategories);
                    console.log("success");
                    onNoteCallback();


                }
                else {
                    setMessage(response.message);
                    setError(true);
                }
            }
            else {
                response = await addNote({
                    title: title,
                    content: content,
                    categoryIDs: category_ids
                });
                if (response.success) {
                    setMessage("Note added successfully");
                    setError(false);
                    setTitle('');
                    setContent('');
                    setSelectedCategories([]);
                    onNoteCallback();
                }
                else {
                    setMessage(response.message);
                    setError(true);
                }
            }

        }
        catch (error) {
            setMessage('Operation failed');
            setError(true);
            console.log(error);
        }
    };

    //delete note
    const handleDelete = async () => {
        console.log(existingNote.note_id);
        try {
            const response = await deleteNote(existingNote.note_id);

            if (response.success) {
                setMessage("Note deleted successfully");
                setError(false);
                setContent('');
                setTitle('');
                setSelectedCategories([]);
                onNoteCallback();
                //close after 2 seconds
                setTimeout(() => {
                    onClose();
                }, 2000);

            }
            else {
                setMessage(response.message);
                setError(true);
            }
        }
        catch (error) {
            setMessage('Deletion failed');
            setError(true);
            console.log(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center">
            <div className="bg-white w-full h-screen lg:h-fit lg:w-3/4 p-6 rounded-lg shadow-lg">
                <div className='flex justify-between items-center'>
                    <h2 className="text-2xl font-bold text-[#6A7EFC] mb-4">{existingNote ? 'Edit Note' : 'Add New Note'}</h2>
                    <p className={!error ? 'text-green-600 align-baseline' : 'text-red-500 align-baseline'}>{message}</p>
                </div>

                <form className="flex flex-col gap-y-8">


                    <div className="flex flex-wrap gap-4 mt-3">
                        <label htmlFor="category" className="text-[#303841] font-semibold ">Select Category</label>
                        {categories.filter(category => category.category_name !== 'All').map((category) => (
                            <label key={category.category_id} className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    value={category.category_name}
                                    checked={selectedCategories.includes(category.category_name)}
                                    onChange={() => handleCategoryChange(category.category_name)}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <span className="text-gray-700">{category.category_name}</span>
                            </label>
                        ))}
                    </div>

                    <label htmlFor="title" className="font-bold text-[#303841]">Title</label>
                    <input
                        id="title"
                        type="text"
                        className="p-2 border-2 border-gray-300 rounded-md"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />

                    <label htmlFor="content" className="font-bold text-[#303841]">Note Content</label>
                    <textarea
                        id="content"
                        className="p-2 border-2 border-gray-300 rounded-md"
                        placeholder="Enter your note content"
                        rows="6"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                    />

                    <div className="flex justify-between mt-4">
                        <div onClick={onClose} >
                            <Button btnLabel="Close" width={20} />
                        </div>
                        <div onClick={(e) => { e.preventDefault(); handleDelete() }}>
                            {existingNote && <button className='bg-red-500 cursor-pointer py-3 px-4 text-white rounded-lg text-xs font-bold'> Delete</button>}

                        </div>
                        <div onClick={(e) => { e.preventDefault(); handleSave() }}>
                            <Button btnLabel="Save" width={20} />
                        </div>

                    </div>
                </form>
            </div>
        </div >
    );
};

export default Note;