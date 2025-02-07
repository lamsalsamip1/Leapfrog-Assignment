import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
const Navbar = ({ user = null }) => {

    const location = useLocation();
    const currentPath = location.pathname;
    const selected = currentPath === '/notes' ? 'Notes' : 'Profile';
    const { firstName, lastName, email } = user || {};  // Optional chaining in case user is null
    const navigate = useNavigate()

    useEffect(() => {
        console.log(user)
    }, [user])
    // console.log(user.firstName)

    const handleLogout = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:5000/api/user/logout", {
                method: "POST",
                credentials: "include", // Allows cookies to be included
                headers: { "Content-Type": "application/json" },
            });

            const data = await response.json();
            if (response.ok) {

                // Redirect to the home page
                navigate("/");
                alert("Logout successful");
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }

    };

    return (
        <nav className='flex flex-col h-full w-1/6 bg-[#6A7EFC] items-center p-6 pt-16 pb-1 justify-between'>

            {/* Text logo with inter font */}
            <h1 className='text-2xl text-white grow-2 '>NOTES APP</h1>


            <ul className='flex flex-col text-white space-y-4 grow-6 w-full text-center'>

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





            <div className='flex  mt-2'>
                <div class="flex items-center justify-center w-10 h-10 px-2 rounded-full bg-[#303841] text-white text-2xl ">
                    {firstName && firstName[0]}
                </div>
                <div className='flex justify-between flex-col ml-2'>
                    <p className='text-white text-sm '>{firstName} {lastName}</p>
                    <p className='text-white text-xs'>{email}</p>
                </div>
            </div>

            <div className='w-full grow-1 flex justify-center items-center'>
                <button className='text-xs bg-white w-full h-8 cursor-pointer hover:bg-gray-100 active:translate-y-0.5' onClick={handleLogout} > Logout </button>
            </div>

        </nav >
    )
}

export default Navbar



