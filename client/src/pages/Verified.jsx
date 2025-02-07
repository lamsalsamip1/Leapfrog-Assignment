import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
const Verified = () => {
    return (
        <div className='h-screen w-screen bg-[#EDF2F6] flex'>


            <div className=' flex h-2/3 w-2/3 m-auto shadow-lg bg-white'>

                <div className='bg-[#6A7EFC] h-full w-1/7'></div>
                <div className='flex flex-col p-20 gap-y-20'>
                    <div className='flex justify-between w-9/10'>
                        <h1 className='text-xl text-[#6A7EFC] font-bold'>Your email has been successfully verified !</h1>
                        <FontAwesomeIcon icon={faCheckCircle} className='text-[#6A7EFC] text-2xl' />
                    </div>

                    <p className=' text-gray-500 w-3/4 '>You can proceed to login
                        <Link to='/login' className=' text-black' > here. </Link></p>
                </div>


            </div>


        </div>
    )
}

export default Verified