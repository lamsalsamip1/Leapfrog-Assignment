import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Modal from './Modal'; // Import your existing Modal component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';


const Navbar = ({ user = null, onMobileToggle }) => {
    const location = useLocation();
    const currentPath = location.pathname;
    const selected = currentPath === '/notes' ? 'Notes' : 'Profile';
    const { firstName, lastName, email } = user || {};  // Optional chaining in case user is null
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [logoutErr, setLogoutErr] = useState(null);

    const [isMobile, setIsMobile] = useState(false);
    const handleMobileToggle = () => {
        setIsMobile(!isMobile);
        onMobileToggle(!isMobile);
    };

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
                setModalMessage("Logout Successful");
                setIsModalOpen(true);
                setLogoutErr(null);
                // Redirect to the home page after a short delay
                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                setModalMessage(data.message || "Logout Failed");
                setIsModalOpen(true);
                setLogoutErr(data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            setModalMessage("An error occurred during logout");
            setIsModalOpen(true);
        }
    };

    return (

        <>
            {/* Hamburger menu */}
            <button className='lg:hidden'>
                <FontAwesomeIcon icon={!isMobile ? faBars : faTimes} className={`${isMobile ? 'text-white' : 'text-[#6A7EFC]'} text-2xl  absolute top-4 right-4`} onClick={handleMobileToggle} />

            </button>



            <nav className={`${isMobile ? 'flex' : 'hidden lg:flex'} flex-col h-full w-full lg:w-1/5 xl:1/6 bg-[#6A7EFC] items-center p-6 pt-16 pb-1 justify-between`}>
                {/* Text logo with inter font */}


                <h1 className='text-xl md:text-2xl text-white text-center grow-2 '>NOTES APP</h1>

                <ul className='flex flex-col text-white space-y-4 grow-6 w-full text-center text-sm md:text-md lg:text-lg'>
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
                    <div className="hidden lg:flex items-center justify-center w-10 h-10 px-2 rounded-full bg-[#303841] text-white text-2xl ">
                        {firstName && firstName[0]}
                    </div>
                    <div className='flex justify-between flex-col ml-2'>
                        <p className='text-white text-xs md:text-sm '>{firstName} {lastName}</p>
                        <p className='text-white text-xs'>{email}</p>
                    </div>
                </div>

                <div className='w-full grow-1 flex justify-center items-center'>
                    <button className='text-xs bg-white w-full h-8 cursor-pointer hover:bg-gray-100 active:translate-y-0.5' onClick={handleLogout} > Logout </button>
                </div>

                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} width='1/2'>
                    <div className="p-8 rounded-lg shadow-lg w-full  bg-white">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-2xl text-[#6A7EFC] font-bold">{modalMessage}</h2>

                        </div>
                        <p className=''>{!logoutErr ? 'You will be redirected to the homepage' : 'Please try again.'}</p>
                    </div>
                </Modal>
            </nav>


        </>


    );
};

export default Navbar;