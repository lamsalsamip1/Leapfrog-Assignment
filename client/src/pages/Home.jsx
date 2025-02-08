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
import useCategories from '../hooks/useCategories';
import { addCategory, deleteCategory } from '../services/CategoryFunctions'

const Home = () => {

    //Fetch user details from useAuth hook
    const User = useAuth();

    // Fetch categories initially from useCategories hook
    const initialCategories = useCategories();

    // State for categories, initially fetched from the hook
    const [noteCategories, setNoteCategories] = useState([]);

    // Update categories state when fetched
    useEffect(() => {
        setNoteCategories(initialCategories);
    }, [initialCategories]); // This will run when initialCategories is updated

    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); // can be add delete null
    const [catMessage, setCatMessage] = useState("");
    const [catError, setCatError] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState("");

    // In your component functions
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
    const clearModal = () => {

        setSelectedCategory("");
        setCatMessage("");
        setCatError(false);
        setModalType(null);

    }



    return (
        <>
            <div className='flex h-screen '>

                <Navbar user={User} />

                <main className='flex flex-col gap-y-2 h-full bg-[#F2F9FF] w-5/6  p-16 pb-4'>

                    <div className='flex flex-row grow-1 justify-between pr-4'>
                        <Searchbar />

                        <div className='flex gap-x-2'>
                            <FontAwesomeIcon icon={faCirclePlus} className='text-[#303841] text-2xl cursor-pointer mt-1' />
                            <p className='text-[#303841] text-lg'>New Note</p>
                        </div>
                    </div>
                    <div className='flex grow-1 gap-x-6  text-[#8B8B8B]'>

                        <Tabbar categories={noteCategories} defaultVal="All" width={32} />
                        <button className="text-[#303841] bg-green-300 text-sm px-2 h-8 ml-4 -mt-1 cursor-pointer hover:bg-green-200 rounded-lg" onClick={() => setModalType("add")}>+ Add Category</button>
                        <button className="text-[#303841] bg-red-300 px-2 text-sm h-8 ml-4 -mt-1 cursor-pointer hover:bg-red-200 rounded-lg" onClick={() => setModalType("delete")}>- Delete Category</button>
                    </div>

                    <div className='flex items-center gap-x-4'>
                        <label htmlFor="noteCount" className="text-[#303841] font-semibold">Show Notes</label>
                        <select
                            id="noteCount"
                            className="outline-none text-sm p-2 w-28 rounded-md bg-white border-2 border-gray-300 hover:border-[#6A7EFC] focus:border-[#6A7EFC] transition duration-200"
                        >
                            <option value="5">5 Notes</option>
                            <option value="10">10 Notes</option>
                            <option value="20">20 Notes</option>
                        </select>
                    </div>


                    <div className='flex grow-8 mt-4 overflow-auto h-46 gap-y-10 pr-6 items-center justify-between flex-wrap custom-scrollbar'>

                        <Notecard bgColor="#FFEAA7" />
                        <Notecard bgColor="#FBA5A5" />
                        <Notecard bgColor="#CCEABB" />
                        <Notecard bgColor="#FFEAA7" />
                        <Notecard bgColor="#FBA5A5" />
                        <Notecard bgColor="#CCEABB" />
                    </div>


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
        </>
    )
}

export default Home