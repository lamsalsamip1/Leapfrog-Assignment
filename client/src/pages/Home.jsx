import React from 'react'
import Navbar from '../components/Navbar'
import Searchbar from '../components/Searchbar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons'
import Tabbar from '../components/Tabbar'
const Home = () => {

    return (
        <>
            <div className='flex h-screen '>

                <Navbar />

                <main className='flex flex-col h-full w-5/6 bg-[#F3F3F3] p-16 pb-4'>

                    <div className='flex flex-row grow-1 justify-between pr-4'>
                        <Searchbar />

                        <div className='flex gap-x-2'>
                            <FontAwesomeIcon icon={faCirclePlus} className='text-[#303841] text-2xl cursor-pointer mt-1' />
                            <p className='text-[#303841] text-lg'>New Note</p>
                        </div>
                    </div>

                    <Tabbar />


                    <div className='flex p-6 grow-7 bg-green-400'>
                        Note cards
                    </div>


                </main>
            </div>
        </>
    )
}

export default Home