import React, { useEffect, useState } from 'react'
import Tabbar from '../components/Tabbar'
import Navbar from '../components/Navbar'
import InputField from '../components/InputField'
import Button from '../components/Button'
import useAuth from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import Modal from '../components/Modal'

const UserDetails = () => {

    const navigate = useNavigate();
    const User = useAuth();
    const { firstName, lastName, email, updatedAt } = User || {};

    const [userFirstName, setFirstName] = useState(firstName);
    const [userLastName, setLastName] = useState(lastName);
    const [modalMessage, setModalMessage] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [isError, setError] = useState(false);


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

                setModalOpen(true);
                setModalMessage("User updated");
                setTimeout(() => {
                    window.location.reload(false);
                }, 2000);


            } else {

                setModalOpen(true);
                setModalMessage("Update failed !");
                setError(true);

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
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} width='1/2'>
                <div className="p-8 rounded-lg shadow-lg w-full  bg-white">
                    <div className="flex flex-col gap-y-10 h-full mb-4">
                        <h2 className={`text-2xl ${!isError ? 'text-[#6A7EFC]' : 'text-red-500'} font-bold`}>{modalMessage}</h2>
                        <p >{!isError ? 'Your first name and last name has been successfully updated. ' : 'Please try again.'}</p>
                    </div>

                </div>
            </Modal>
        </form>

    )
}

const PasswordLogin = () => {



    const User = useAuth();
    const { twoFAEnabled } = User || {};
    console.log(twoFAEnabled)

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        reNewPassword: ''
    });
    const [modalMessage, setModalMessage] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => {
            const updatedForm = { ...prevState, [name]: value };

            if (name === 'newPassword' || name === 'reNewPassword') {
                if (updatedForm.newPassword !== updatedForm.reNewPassword) {
                    setError('Passwords do not match');
                } else {
                    setError('');
                }
            }
            return updatedForm;
        });
    };


    const handlePwChange = async (e) => {
        e.preventDefault();
        if (formData.newPassword !== formData.reNewPassword) {
            setModalOpen(true);
            setModalMessage("Passwords do not match");
            setError("Passwords do not match");
            return;
        }
        // make a fetch request to update the user details
        try {
            const { reNewPassword, ...dataToSend } = formData;
            const response = await fetch("http://localhost:5000/api/user/change-password", {
                method: "PUT",
                credentials: "include", // Allows cookies to be included
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dataToSend),
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {

                setModalOpen(true);
                setModalMessage("Password updated");
                setFormData({
                    oldPassword: '',
                    newPassword: '',
                    reNewPassword: ''
                });

            } else {
                setModalOpen(true);
                setModalMessage(data.msg);
                setError(data.msg);
                setFormData({
                    oldPassword: '',
                    newPassword: '',
                    reNewPassword: ''
                });

            }
        }
        catch (error) {
            console.error("Error:", error);
        }
    }

    const handle2FA = (e) => {
        e.preventDefault();
        if (!twoFAEnabled) {
            navigate('/enable2fa');
        }
        else {
            navigate('/disable2fa');
        }

    }
    return (
        <div className='flex justify-between w-1/2'>

            <form onSubmit={handlePwChange} className='flex flex-col gap-y-10 mt-2'>

                <InputField label='Current password' type='password' name="oldPassword" onChange={handleChange} value={formData.oldPassword} />

                <InputField label='Enter new password' type='password' name="newPassword" onChange={handleChange} value={formData.newPassword} />

                <InputField label='Re-enter new password' type='password' name="reNewPassword" onChange={handleChange} value={formData.reNewPassword} />
                {error && <p className='text-red-500 text-xs'>{error}</p>}
                <Button type="submit" btnLabel='Change password' />


            </form>
            <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} width='1/2'>
                <div className="p-8 rounded-lg shadow-lg w-full  bg-white">
                    <div className="flex flex-col gap-y-10 h-full mb-4">
                        <h2 className={`text-2xl ${!error ? 'text-[#6A7EFC]' : 'text-red-500'} font-bold`}>{modalMessage}</h2>
                        <p >{!error ? 'Your password has been successfully updated. ' : 'Please try again.'}</p>
                    </div>

                </div>
            </Modal>
            <form onSubmit={handle2FA} className='flex flex-col gap-y-10 mt-2'>

                <div className='flex flex-col gap-y-1'>
                    <label className='text-xs'>Two Factor Authentication</label>

                    <p className='font-bold border-1 border-gray-400 p-2 w-50 text-sm'>{twoFAEnabled ? "Enabled" : "Disabled"}</p>
                </div>

                <Button btnLabel={twoFAEnabled ? "Disable 2FA" : "Enable 2FA"} type="submit" />

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

    const categories = [
        { category_id: 1, category_name: "Basic Info" },
        { category_id: 2, category_name: "Password & Login" }
    ];

    return (
        <div className='flex h-screen '>
            <Navbar user={User} />
            <div className='flex flex-col p-16 w-5/6 gap-y-10 '>
                <h1 className='text-xl font-semibold' >Settings</h1>
                <div className='flex gap-x-16 text-[#8B8B8B]'>
                    <Tabbar categories={categories} defaultVal="Basic Info" width={40} onTabChange={handleTabChange} />
                </div>
                {selected === 'Basic Info' ? <UserDetails /> : <PasswordLogin />}
            </div>
        </div>
    )
}

export default Profile