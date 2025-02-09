import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
const RegSuccess = () => {
    return (
        <div className='h-screen w-screen bg-[#EDF2F6] flex'>


            <div className=' flex h-4/5 md:h-2/3 w-full md:w-2/3 m-auto shadow-lg bg-white'>

                <div className='bg-[#6A7EFC] h-full w-1/7'></div>
                <div className='flex flex-col p-10 md:p-20 gap-y-20'>
                    <div className='flex justify-between'>
                        <h1 className='text-lg md:text-xl text-[#6A7EFC] font-bold'>Thank you for registering !</h1>
                        <div className='hidden md:flex'>
                            <FontAwesomeIcon icon={faCheckCircle} className='text-[#6A7EFC] text-2xl' />
                        </div>

                    </div>

                    <p className='text-gray-700 w-full md:w-3/4 text-sm md:text-md '> Please check your email and verify your account to complete the registration process.</p>

                    <p className=' text-gray-500 w-full md:w-3/4 text-sm md:text-md '>After completing the verification, you can login
                        <Link to='/' className=' text-black text-sm md:text-md' > here. </Link></p>
                </div>


            </div>


        </div>
    )
}

export default RegSuccess