import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner'


const Login = () => {

    const navigate = useNavigate()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false);

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
                alert("Login successful");
                // Redirect to the home page
                navigate("/notes");
            } else {
                alert(data.message || "Login failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <div className='h-screen w-screen bg-[#EDF2F6] flex'>


            <div className=' flex h-2/3 w-2/3 m-auto shadow-lg bg-white'>

                <div className='bg-[#6A7EFC] h-full w-1/7'></div>

                <div className='flex flex-col items-center gap-y-6 grow-1 py-12 -ml-10'>
                    <div className='flex flex-col items-center gap-y-4'>
                        <h1 className='text-[#6A7EFC] font-semibold text-3xl'>Login</h1>
                        <p className='text-xs text-[#8B8B8B]'>Please enter your details to login to your account</p>
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
                <div className='p-4'>
                    {/* Show loading message */}
                    {loading && <Spinner text="Registering.. Please wait" />}
                </div>

            </div>


        </div>
    )
}

export default Login