import React, { useState } from 'react'
import Tabbar from '../components/Tabbar'
import Navbar from '../components/Navbar'
import InputField from '../components/InputField'
import Button from '../components/Button'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const UserDetails = () => {

    const navigate = useNavigate();
    const User = useAuth();
    const { firstName, lastName, email, updatedAt } = User || {};

    const [userFirstName, setFirstName] = useState(firstName);
    const [userLastName, setLastName] = useState(lastName);




    const handleSubmit = async (e) => {
        e.preventDefault();

        // make a fetch request to update the user details
        try {
            const response = await fetch("http://localhost:5000/api/user/edit", {
                method: "PUT",
                credentials: "include", // Allows cookies to be included
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userFirstName, userLastName }),
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                alert("User updated")
                window.location.reload(false);

            } else {
                alert("Update failed !");

            }
        } catch (error) {
            console.error("Error:", error);
        }

    }



    return (
        <form className='flex flex-col gap-y-10 mt-2' onSubmit={handleSubmit}>
            <InputField label='First Name' placeholder={firstName} value={userFirstName} onChange={(e) => setFirstName(e.target.value)} />

            <InputField label='Last Name' placeholder={lastName} value={userLastName} onChange={(e) => setLastName(e.target.value)} />

            <div className='flex gap-x-2 text-sm'>
                <label>Email:</label>
                <span className='text-[#8B8B8B]'>{email}</span>
            </div>

            <div className='flex gap-x-2 text-sm'>
                <label>Last Updated:</label>
                <span className='text-[#8B8B8B]'>{updatedAt ? updatedAt.slice(0, 10) : ""}</span>
            </div>
            <div className='w-1/2'>
                <button className="bg-[#6A7EFC] hover:bg-[#6aa2fc] text-xs font-bold text-white w-36 py-3 cursor-pointer rounded-2xl active:translate-y-1" type='submit'>Save Changes</button>
            </div>




        </form>
    )
}

const PasswordLogin = () => {

    // const User = useAuth();
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [reNewPassword, setReNewPassword] = useState('');

    const handlePwChange = async (e) => {
        e.preventDefault();
        if (newPassword !== reNewPassword) {
            alert("Passwords do not match");
            return;
        }
        // make a fetch request to update the user details
        try {
            const response = await fetch("http://localhost:5000/api/user/change-password", {
                method: "PUT",
                credentials: "include", // Allows cookies to be included
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ oldPassword, newPassword }),
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                alert("Password updated")
                window.location.reload(false);

            } else {
                alert("Update failed !");

            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    }

    return (
        <div className='flex justify-between w-1/2'>

            <form onSubmit={handlePwChange} className='flex flex-col gap-y-10 mt-2'>

                <InputField label='Current password' type='password' onChange={(e) => setOldPassword(e.target.value)} value={oldPassword} />

                <InputField label='Enter new password' type='password' onChange={(e) => setNewPassword(e.target.value)} value={newPassword} />

                <InputField label='Re-enter new password' type='password' onChange={(e) => setReNewPassword(e.target.value)} value={reNewPassword} />

                <Button type="submit" btnLabel='Change password' />


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
    const User = useAuth();
    return (
        <div className='flex h-screen '>

            <Navbar user={User} />

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