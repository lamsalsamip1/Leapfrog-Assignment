import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons'
import Button from '../components/Button'
import { Link } from 'react-router-dom'
const Login = () => {
    return (
        <div className='h-screen w-screen bg-[#EDF2F6] flex'>


            <div className=' flex h-2/3 w-2/3 m-auto shadow-lg bg-white'>

                <div className='bg-[#6A7EFC] h-full w-1/7'></div>

                <div className='flex flex-col items-center gap-y-6 grow-1 py-12 -ml-10'>
                    <div className='flex flex-col items-center gap-y-4'>
                        <h1 className='text-[#6A7EFC] font-semibold text-3xl'>Login</h1>
                        <p className='text-xs text-[#8B8B8B]'>Please enter your details to login to your account</p>
                    </div>
                    <form action="" className='flex flex-col gap-y-6 mt-4'>

                        <div className='border-1 p-2 rounded-md border-[#D7D7D7] flex gap-x-2 items-center'>
                            <FontAwesomeIcon icon={faUser} className='text-[#D7D7D7] text-sm' />
                            <input type="email" className='outline-none placeholder:text-xs text-xs p-1 text-gray-800' placeholder='Enter your email address' />
                        </div>

                        <div className='border-1 p-2 rounded-md border-[#D7D7D7] flex gap-x-2 items-center'>
                            <FontAwesomeIcon icon={faLock} className='text-[#D7D7D7] text-sm' />
                            <input type="password" className='outline-none placeholder:text-xs text-xs p-1 text-gray-800' placeholder='Enter your password' />
                        </div>

                        <Button btnLabel='Sign In' width={32} />

                        <p className='text-xs text-[#8B8B8B]'> Don't have an account ?
                            <Link to='/register' className='font-semibold text-gray-800 cursor-pointer hover:text-gray-600 ml-1'>Register Now</Link>
                        </p>
                    </form>
                </div>

            </div>


        </div>
    )
}

export default Login