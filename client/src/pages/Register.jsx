import React from 'react'
import Button from '../components/Button'
import InputField from '../components/InputField'

const Register = () => {
    return (
        <div className='h-screen w-screen bg-[#EDF2F6] flex'>


            <div className=' flex h-3/4 w-2/3 m-auto shadow-lg bg-white'>

                <div className='bg-[#6A7EFC] h-full w-1/7'></div>

                <div className='flex flex-col items-center gap-y-6 grow-1 py-12 -ml-10'>
                    <div className='flex flex-col items-center gap-y-4'>
                        <h1 className='text-[#6A7EFC] font-semibold text-3xl'>Register</h1>
                        <p className='text-xs text-[#8B8B8B]'>Please enter your details to create a new account</p>
                    </div>
                    <form action="" className='flex flex-col gap-y-6 mt-4 w-1/2'>

                        <div className='flex justify-between'>
                            <InputField label='First Name' height={8} />
                            <InputField label='Last Name' height={8} />
                        </div>
                        <div className='flex flex-col justify-between h-50'>
                            <InputField label='Email Address' type='email' height={8} />
                            <InputField label='Password' type='password' height={8} />
                            <InputField label='Confirm Password' type='password' height={8} />
                        </div>

                        <Button btnLabel='Sign Up' width={32} />


                    </form>
                </div>

            </div>


        </div>
    )
}

export default Register