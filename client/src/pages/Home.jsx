import React from 'react'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import Tabbar from '../components/Tabbar'
import Notecard from '../components/Notecard'
const Home = () => {
    const noteCategories = ["All", "Work", "School", "Thoughts"];

    return (
        <>
            <div className='flex h-screen '>

                <Navbar />

                <main className='flex flex-col h-full bg-[#F2F9FF] w-5/6  p-16 pb-4'>

                    <div className='flex flex-row grow-1 justify-between pr-4'>
                        <Searchbar />

                        <div className='flex gap-x-2'>
                            <FontAwesomeIcon icon={faCirclePlus} className='text-[#303841] text-2xl cursor-pointer mt-1' />
                            <p className='text-[#303841] text-lg'>New Note</p>
                        </div>
                    </div>
                    <div className='flex grow-2 gap-x-6 text-[#8B8B8B]'>

                        <Tabbar categories={noteCategories} defaultVal="All" />
                        <button className="text-[#303841]  h-8 ml-4">+ Add Category</button>
                    </div>


                    <div className='flex grow-7 justify-between'>
                        <Notecard bgColor="#FFEAA7" />
                        <Notecard bgColor="#FBA5A5" />
                        <Notecard bgColor="#CCEABB" />
                    </div>


                </main>
            </div>
        </>
    )
}

export default Home