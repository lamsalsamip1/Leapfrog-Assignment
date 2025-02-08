import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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


const Home = () => {

    //Fetch user details from useAuth hook
    const User = useAuth();

    // Fetch categories from API
    const noteCategories = useCategories();

    const [modalOpen, setModalOpen] = useState(false);
    const [catMessage, setCatMessage] = useState("");
    const [catError, setCatError] = useState(false);

    const addCategory = async (e) => {
        e.preventDefault();
        const category_name = e.target[0].value;

        try {
            const response = await fetch("http://localhost:5000/api/category", {
                method: "POST",
                credentials: "include", // Allows cookies to be included
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ category_name }),
            });

            const data = await response.json();
            console.log(data);

            if (response.ok) {
                setCatMessage("Category added successfully");
                setCatError(false);

            } else {
                setCatMessage(data.msg);
                setCatError(true);
            }
        } catch (error) {
            console.error("Error adding category:", error);
            setCatMessage("Error adding category");
            setCatError(true);
        }
    }

    return (
        <>
            <div className='flex h-screen '>

                <Navbar user={User} />

                <main className='flex flex-col h-full bg-[#F2F9FF] w-5/6  p-16 pb-4'>

                    <div className='flex flex-row grow-1 justify-between pr-4'>
                        <Searchbar />

                        <div className='flex gap-x-2'>
                            <FontAwesomeIcon icon={faCirclePlus} className='text-[#303841] text-2xl cursor-pointer mt-1' />
                            <p className='text-[#303841] text-lg'>New Note</p>
                        </div>
                    </div>
                    <div className='flex grow-2 gap-x-6 text-[#8B8B8B]'>

                        <Tabbar categories={noteCategories} defaultVal="All" width={32} />
                        <button className="text-[#303841]  h-8 ml-4 -mt-1 cursor-pointer hover:text-gray-500" onClick={() => setModalOpen(true)}>+ Add Category</button>
                    </div>


                    <div className='flex grow-7 justify-between'>
                        <Notecard bgColor="#FFEAA7" />
                        <Notecard bgColor="#FBA5A5" />
                        <Notecard bgColor="#CCEABB" />
                    </div>

                    {/* <p>{User && User.firstName}</p> */}

                </main>
            </div>

            {modalOpen &&
                <Modal isOpen={true} onClose={() => setModalOpen(false)}>
                    <div className='flex flex-col p-7 gap-y-6 pr-2'>
                        <h1 className='text-xl font-semibold text-[#6A7EFC]'>Add Category</h1>
                        <form className='flex justify-between w-90 pr-4' onSubmit={addCategory}>
                            <input type="text" placeholder="Category Name" className='w-50 outline-none border-b-1 border-gray-300' />
                            <Button btnLabel={"Add"} width={20} type="submit" />
                        </form>

                        {catMessage && <p className={`${catError ? 'text-red-400' : 'text-green-600 '} text-xs `}>{catMessage}</p>}
                    </div>
                </Modal>
            }
        </>
    )
}

export default Home