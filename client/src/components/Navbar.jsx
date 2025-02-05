import React, { useState } from 'react'

const Navbar = () => {

    const [selected, setSelected] = useState('Notes');

    const handleSelect = (item) => {
        setSelected(item);
    };

    return (
        <nav className='flex flex-col h-full w-1/6 bg-[#6A7EFC] items-center p-6 pt-16'>

            {/* Text logo with inter font */}
            <h1 className='text-2xl text-white grow-2 '>NOTES APP</h1>


            <ul className='flex flex-col text-white space-y-4 grow-8 w-full text-center'>
                <li
                    className={`cursor-pointer p-2  ${selected === 'Notes' ? 'bg-white text-black' : ''}`}
                    onClick={() => handleSelect('Notes')}
                >
                    Notes
                </li>
                <li
                    className={`cursor-pointer p-2 ${selected === 'Profile' ? 'bg-white text-black' : ''}`}
                    onClick={() => handleSelect('Profile')}
                >
                    Profile
                </li>
            </ul>
            {/* Navigation links */}

        </nav>
    )
}

export default Navbar



