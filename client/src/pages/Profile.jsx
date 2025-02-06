import React, { useState } from 'react'
import Tabbar from '../components/Tabbar'
import Navbar from '../components/Navbar'
import InputField from '../components/InputField'
import Button from '../components/Button'

const UserDetails = () => {
    return (
        <form className='flex flex-col gap-y-10 mt-2'>
            <InputField label='First Name' placeholder='Samip' />

            <InputField label='Last Name' placeholder='Lamsal' />

            <div className='flex gap-x-2 text-sm'>
                <label>Email:</label>
                <span className='text-[#8B8B8B]'>lamsalsamip@gmail.com</span>
            </div>

            <div className='flex gap-x-2 text-sm'>
                <label>Last Updated:</label>
                <span className='text-[#8B8B8B]'>05 Feb, 2025</span>
            </div>
            <div className='mt-4'>
                <Button btnLabel='Save Changes' />
            </div>


        </form>
    )
}

const PasswordLogin = () => {
    return (
        <div className='flex justify-between w-1/2'>

            <form action="" className='flex flex-col gap-y-10 mt-2'>

                <InputField label='Current password' type='password' />

                <InputField label='Enter new password' type='password' />

                <InputField label='Re-enter new password' type='password' />

                <Button btnLabel='Change password' />


            </form>
            <form action="" className='flex flex-col gap-y-10 mt-2'>

                <div className='flex flex-col gap-y-1'>
                    <label className='text-xs'>Two Factor Authentication</label>

                    <p className='font-bold border-1 border-gray-400 p-2 w-50 text-sm'>Disabled</p>
                </div>

                <Button btnLabel='Enable 2FA' />

            </form>
        </div>
    )
}


const Profile = () => {

    const [selected, setSelected] = useState('Basic Info');
    const handleTabChange = (newTab) => {
        setSelected(newTab);
    };
    return (
        <div className='flex h-screen '>

            <Navbar />

            <div className='flex flex-col p-16 w-5/6 gap-y-10 '>

                <h1 className='text-xl font-semibold' >Settings</h1>
                <div className='flex gap-x-16 text-[#8B8B8B]'>
                    <Tabbar categories={["Basic Info", "Password & Login"]} defaultVal="Basic Info" width={40} onTabChange={handleTabChange} />
                </div>

                {selected === 'Basic Info' ? <UserDetails /> : <PasswordLogin />}



            </div>

        </div>
    )
}

export default Profile