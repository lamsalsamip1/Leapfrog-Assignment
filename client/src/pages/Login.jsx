import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'
import useAuth from '../hooks/useAuth'
import Modal from '../components/Modal'
const Login = () => {


    const navigate = useNavigate()

    const User = useAuth();
    if (User) {
        setTimeout(() => {
            navigate("/notes");
        }, 2000);
        navigate('/notes');
    }

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [isError, setError] = useState(false);

    // useEffect(() => {
    //     if (message) {
    //         const timer = setTimeout(() => {
    //             setMessage(""); // Clear message after 5 seconds
    //         }, 5000);
    //         return () => clearTimeout(timer); // Cleanup timeout on component unmount or message change
    //     }
    // }, [message]);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/user/login", {
                method: "POST",
                credentials: "include", // Allows cookies to be included
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();
            if (response.ok) {
                // 2FA required
                if (response.status === 206) {
                    navigate("/twofa");
                    return;

                }
                setError(false);
                setMessage("Login successful ! ");

                setTimeout(() => {
                    navigate("/notes");
                }
                    , 2000);


            } else {
                setMessage(data.msg || "Login failed !");
                setError(true);

            }
        } catch (error) {
            console.error("Error:", error);
            setMessage("Server Error");
            setError(true);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className='h-screen w-screen bg-[#EDF2F6] flex '>
            {/* {message && (
                <div className={`fixed left-2/5 auto h-12 w-1/5   text-white text-center py-3 z-10 transition-discrete ease-in ${isError ? 'bg-red-400' : 'bg-[#6A7EFC]'} `}>{message}</div>
            )} */}
            <Modal isOpen={message} onClose={() => setMessage("")} width='1/2'>
                <div className="flex flex-col p-6 md:p-8 rounded-lg shadow-lg w-full bg-white">
                    <div className="flex justify-between items-center mb-4 mr-4">
                        <h2 className={`text-md md:text-xl ${!isError ? 'text-[#6A7EFC]' : 'text-red-500'} font-bold`}>{isError ? "An error occured." : message}</h2>

                    </div>
                    <p className='text-sm md:text-lg'>{!isError ? 'You will be redirected to the notes page.' : message}</p>
                </div>
            </Modal>

            <div className=' flex flex-col md:flex-row h-2/3 w-2/3 m-auto shadow-lg bg-white'>

                <div className='bg-[#6A7EFC] h-1/8 md:h-full w-full md:w-1/7'></div>

                <div className='flex flex-col items-center gap-y-6 grow-1 py-12 md:-ml-10'>
                    <div className='flex flex-col items-center gap-y-4'>
                        <h1 className='text-[#6A7EFC] font-semibold text-2xl md:text-3xl'>Login</h1>
                        <p className='text-xs text-[#8B8B8B] hidden md:block'>Please enter your details to login to your account</p>
                    </div>
                    <form onSubmit={handleLogin} className='flex flex-col gap-y-6 mt-4'>

                        <div className='border-1 p-2 rounded-md border-[#D7D7D7] flex gap-x-2 items-center'>
                            <FontAwesomeIcon icon={faUser} className='text-[#D7D7D7] text-sm' />
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='outline-none placeholder:text-xs text-xs p-1 text-gray-800' placeholder='Enter your email address' />
                        </div>

                        <div className='border-1 p-2 rounded-md border-[#D7D7D7] flex gap-x-2 items-center'>
                            <FontAwesomeIcon icon={faLock} className='text-[#D7D7D7] text-sm' />
                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='outline-none placeholder:text-xs text-xs p-1 text-gray-800' placeholder='Enter your password' />
                        </div>

                        <Button btnLabel='Sign In' width={32} type='submit' />

                        <p className='text-xs text-[#8B8B8B]'> Don't have an account ?
                            <Link to='/register' className='font-semibold text-gray-800 cursor-pointer hover:text-gray-600 ml-1'>Register Now</Link>
                        </p>
                    </form>
                </div>
                <div className='absolute top-0 right-0 p-4'>
                    {/* Show loading message */}
                    {loading && <Spinner text="Registering.. Please wait" />}
                </div>

            </div>


        </div>
    )
}

export default Login