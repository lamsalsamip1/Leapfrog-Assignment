import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import Tabbar from '../components/Tabbar'
import Notecard from '../components/Notecard'
import useAuth from '../hooks/useAuth'
import Modal from '../components/Modal'
import Button from '../components/Button'
import { addCategory, deleteCategory, getAllCategories } from '../services/CategoryFunctions'
import { getNotes, getNotesByCategory } from '../services/NoteFunctions'
import Note from '../components/Note'

const Home = () => {

    //Fetch user details from useAuth hook, also redirects to login page if not authenticated
    const User = useAuth();

    // State for categories, initially fetched from the hook
    const [noteCategories, setNoteCategories] = useState([]);
    const [notes, setNotes] = useState([]);
    const [limit, setLimit] = useState(5);

    // Update categories state when fetched
    useEffect(() => {
        fetchCategories();
        fetchNotes(5);

    }, []);


    const [modalType, setModalType] = useState(null); // can be add delete null
    const [catMessage, setCatMessage] = useState("");
    const [catError, setCatError] = useState(false);
    const [notesError, setNotesError] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState("All");


    const [addNote, setAddNote] = useState(false);
    const [editNote, setEditNote] = useState("");

    const fetchCategories = async () => {
        try {
            const formattedCategories = await getAllCategories();
            setNoteCategories([
                { category_id: 0, category_name: "All" },
                ...formattedCategories,
            ]);
        }
        catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    //fetch notes based on limit
    const fetchNotes = async (limit) => {
        try {
            console.log("Fetching notes");
            const notes = await getNotes(limit);
            if (notes.success) {
                setNotes(notes.data);
            }
            else {
                throw new Error(notes.message);
            }

        }
        catch (error) {
            console.error("Error fetching notes:", error);
            setNotesError(error.message);
        };
    }

    const fetchNotesByCategory = async (categoryName, newLimit) => {
        try {
            console.log("Fetching notes by category", categoryName);
            const category_id = noteCategories.find(category => category.category_name === categoryName).category_id;
            console.log("Category id is", category_id);
            const notes = await getNotesByCategory(category_id, newLimit);
            if (notes.success) {
                setNotes(notes.data);
            }
            else {
                throw new Error(notes.message);
            }
        }
        catch (error) {
            console.error("Error fetching notes:", error);
            setNotesError(error.message);
        };
    }

    const handleTabChange = (category) => {
        const categoryName = category.category_name;
        setSelectedCategory(categoryName);
        if (categoryName === "All") fetchNotes(limit); // Fetch all notes
        else
            fetchNotesByCategory(categoryName, limit); // Fetch notes for the new category
    };

    const handleLimitChange = (newLimit) => {
        setLimit(newLimit);

        if (selectedCategory === "All") {
            console.log("fetching all notes");
            fetchNotes(newLimit);
        } else {
            console.log("fetching notes by category", selectedCategory, newLimit);
            fetchNotesByCategory(selectedCategory, newLimit);
        }
    };

    // handle category functions and call services to make API calls
    const addCategoryHandler = async (e) => {
        e.preventDefault();
        const category_name = e.target[0].value;

        const result = await addCategory(category_name);

        if (result.success) {
            setCatMessage("Category added successfully");
            setCatError(false);
            const cat_entry = { category_id: result.data.category_id, category_name: result.data.category_name };
            setNoteCategories((prevCategories) => [
                ...prevCategories,
                cat_entry,
            ]);
            console.log(noteCategories);
        } else {
            setCatMessage(result.message);
            setCatError(true);
        }
    };

    const deleteCategoryHandler = async (e) => {
        e.preventDefault();
        const category_id = noteCategories.find(category => category.category_name === selectedCategory).category_id;
        const result = await deleteCategory(category_id);

        if (result.success) {
            setCatMessage("Category deleted successfully");
            setCatError(false);
            setNoteCategories((prevCategories) =>
                prevCategories.filter(
                    (category) => category.category_id !== category_id
                )
            );

        } else {
            setCatMessage(result.message);
            setCatError(true);
        }
    };

    const handleEditIconClick = (note) => {
        console.log("Edit icon clicked", note);
        setEditNote(note);
    }

    const handleNoteUpdate = () => {
        fetchNotes(limit);
    }

    //implement notes sorting
    const handleSort = (sortOption) => {
        const [sortType, order] = sortOption.split('-');
        console.log("Sorting by", sortType, "in", order, "order");
        const sortedNotes = [...notes].sort((a, b) => {
            let comparison = 0;
            if (sortType === "createdAt") {
                comparison = new Date(a.createdAt) - new Date(b.createdAt);
            } else {
                comparison = new Date(a.updatedAt) - new Date(b.updatedAt);
            }
            return order === 'asc' ? comparison : -comparison;
        });
        setNotes(sortedNotes);
    }

    const clearModal = () => {

        setSelectedCategory("");
        setCatMessage("");
        setCatError(false);
        setModalType(null);
        setNotesError("");

    }

    const colors = ["#FFEAA7", "#FBA5A5", "#CCEABB"];

    return (
        <>
            <div className='flex h-screen '>

                <Navbar user={User} />

                <main className='flex flex-col gap-y-2 h-full bg-[#F2F9FF] w-5/6  p-16 pb-4'>

                    <div className='flex flex-row grow-1 justify-between pr-4'>
                        <Searchbar />

                        <div className='flex gap-x-2  text-[#303841] cursor-pointer hover:text-[#4b4e52] active:translate-y-1' onClick={() => setAddNote(true)}>
                            <FontAwesomeIcon icon={faCirclePlus} className=' text-2xl  mt-1' />
                            <p className=' text-lg '>New Note</p>
                        </div>
                    </div>
                    <div className='flex grow-1 gap-x-6  text-[#8B8B8B]'>

                        <Tabbar categories={noteCategories} defaultVal="All" width={32} onTabChange={handleTabChange} />
                        <button className="text-[#303841] bg-green-300 text-sm px-2 h-8 ml-4 -mt-1 cursor-pointer hover:bg-green-200 rounded-lg" onClick={() => setModalType("add")}>+ Add Category</button>
                        <button className="text-[#303841] bg-red-300 px-2 text-sm h-8 ml-4 -mt-1 cursor-pointer hover:bg-red-200 rounded-lg" onClick={() => setModalType("delete")}>- Delete Category</button>
                    </div>
                    <div className='flex gap-x-20 mt-4'>
                        <div className='flex items-center gap-x-4'>
                            <label htmlFor="noteCount" className="text-[#303841] font-semibold">Show Notes</label>
                            <select
                                id="noteCount"
                                className="outline-none text-sm p-2 w-28 rounded-md bg-white border-2 border-gray-300 hover:border-[#6A7EFC] focus:border-[#6A7EFC] transition duration-200"
                                onChange={(e) => handleLimitChange(e.target.value)}
                            >
                                <option value="5">5 Notes</option>
                                <option value="10">10 Notes</option>
                                <option value="20">20 Notes</option>
                                <option value="50">50 Notes</option>
                                <option value="100">100 Notes</option>
                                <option value="1000">All Notes</option>
                            </select>
                        </div>
                        <div className='flex items-center gap-x-4'>
                            <label htmlFor="noteCount" className="text-[#303841] font-semibold">Sort By</label>
                            <select
                                id="noteCount"
                                className="outline-none text-sm p-2 w-48 rounded-md bg-white border-2 border-gray-300 hover:border-[#6A7EFC] focus:border-[#6A7EFC] transition duration-200"
                                onChange={(e) => handleSort(e.target.value)}
                            >
                                <option value="createdAt-asc">Creation Date (ASC)</option>
                                <option value="createdAt-desc">Creation Date (DES)</option>
                                <option value="updatedAt-asc">Last Updated (ASC)</option>
                                <option value="updatedAt-desc">Last Updated (DES)</option>

                            </select>
                        </div>
                    </div>



                    <div className='flex grow-8 mt-8 overflow-auto h-46 gap-y-10 pr-6 items-center gap-x-12 flex-wrap custom-scrollbar'>

                        {notes.map((note, index) => (
                            <Notecard key={index} bgColor={colors[index % colors.length]} note={note} onEdit={handleEditIconClick} />
                        ))}
                    </div>

                    {/* Add an error field on top middle of screen */}


                </main>
            </div>

            {modalType == "add" &&
                <Modal isOpen={true} onClose={() => clearModal()}>
                    <div className='flex flex-col p-7 gap-y-6 pr-2'>
                        <h1 className='text-xl font-semibold text-[#6A7EFC] rounded-md'>Add Category</h1>
                        <form className='flex justify-between w-90 pr-4' onSubmit={addCategoryHandler}>
                            <input type="text" placeholder="Category Name" className='w-50 outline-none border-b-1 border-gray-300' />
                            <Button btnLabel={"Add"} width={20} type="submit" />
                            {/* <button className='bg-[#6A7EFC] text-white rounded-lg w-20 text-sm hover:bg-[#6aa2fc] py-3 cursor-pointer font-semibold' type="submit"> Add</button> */}
                        </form>

                        {catMessage && <p className={`${catError ? 'text-red-400' : 'text-green-600 '} text-xs `}>{catMessage}</p>}
                    </div>
                </Modal>
            }

            {modalType == "delete" &&
                <Modal isOpen={true} onClose={() => clearModal()}>
                    <div className='flex flex-col p-7 gap-y-6 pr-2'>
                        <h1 className='text-xl font-semibold text-[#6A7EFC]'>Delete Category</h1>
                        <form className='flex justify-between w-90 pr-4' onSubmit={deleteCategoryHandler}>
                            <select
                                className="w-50 border-b-1 border-gray-300 outline-none"
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                <option value="">Select a category</option>
                                {noteCategories.filter((category) => category.category_name.toUpperCase() !== "ALL")
                                    .map((category) => (
                                        <option key={category.category_id} value={category.id}>
                                            {category.category_name}
                                        </option>
                                    ))}
                            </select>
                            <Button btnLabel={"Delete"} width={20} type="submit" />
                        </form>

                        {catMessage && <p className={`${catError ? 'text-red-400' : 'text-green-600 '} text-xs `}>{catMessage}</p>}
                    </div>
                </Modal>
            }

            {notesError &&
                <Modal isOpen={true} onClose={() => clearModal()}>
                    <div className='flex flex-col justify-between w-60 p-7 pr-2'>
                        <h1 className='text-[#6A7EFC] font-bold text-xl'>Error </h1>
                        <p className='text-sm text-red-600'>Could not fetch notes</p>
                        <p className='text-sm '>Message: {notesError}</p>
                    </div>
                </Modal>
            }

            {addNote && (
                <Note
                    onClose={() => setAddNote(false)}
                    categories={noteCategories}
                    onNoteCallback={handleNoteUpdate}
                />
            )}

            {
                editNote && (
                    <Note
                        onClose={() => setEditNote(false)}
                        categories={noteCategories}
                        existingNote={editNote}
                        onNoteCallback={handleNoteUpdate}
                    />
                )

            }


        </>
    )
}

export default Home