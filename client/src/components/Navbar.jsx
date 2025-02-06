import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {

    const location = useLocation();
    const currentPath = location.pathname;
    const selected = currentPath === '/' ? 'Notes' : 'Profile';


    return (
        <nav className='flex flex-col h-full w-1/6 bg-[#6A7EFC] items-center p-6 pt-16 justify-around'>

            {/* Text logo with inter font */}
            <h1 className='text-2xl text-white grow-2 '>NOTES APP</h1>


            <ul className='flex flex-col text-white space-y-4 grow-8 w-full text-center'>

                <Link to='/'>
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
            {/* Navigation links */}

        </nav >
    )
}

export default Navbar



