import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = ({ user = null }) => {

    const location = useLocation();
    const currentPath = location.pathname;
    const selected = currentPath === '/' ? 'Notes' : 'Profile';
    const { firstName, lastName, email } = user || {};  // Optional chaining in case user is null

    useEffect(() => {
        console.log(user)
    }, [user])
    // console.log(user.firstName)

    return (
        <nav className='flex flex-col h-full w-1/6 bg-[#6A7EFC] items-center p-6 pt-16 justify-around'>

            {/* Text logo with inter font */}
            <h1 className='text-2xl text-white grow-2 '>NOTES APP</h1>


            <ul className='flex flex-col text-white space-y-4 grow-8 w-full text-center'>

                <Link to='/notes'>
                    <li
                        className={`cursor-pointer p-2  ${selected === 'Notes' ? 'bg-white text-black' : ''}`}

                    >
                        Notes
                    </li>
                </Link>

                <Link to='/profile'>
                    <li
                        className={`cursor-pointer p-2 ${selected === 'Profile' ? 'bg-white text-black' : ''}`}

                    >
                        Profile
                    </li>
                </Link>
            </ul>


            <div className='flex cursor-pointer'>
                <div class="flex items-center justify-center w-10 h-10 px-2 py-4 rounded-full bg-[#303841] text-white text-2xl ">
                    {firstName && firstName[0]}
                </div>
                <div className='flex  justify-between flex-col ml-2'>
                    <p className='text-white text-sm '>{firstName} {lastName}</p>
                    <p className='text-white text-xs'>lamsalsamip@gmail.com</p>
                </div>
            </div>
            {/* Navigation links */}

        </nav >
    )
}

export default Navbar



