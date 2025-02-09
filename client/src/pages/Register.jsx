import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import InputField from '../components/InputField';
import Spinner from '../components/Spinner';
const Register = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => {
            const updatedForm = { ...prevState, [name]: value };

            if (name === 'password' || name === 'confirmPassword') {
                if (updatedForm.password !== updatedForm.confirmPassword) {
                    setError('Passwords do not match');
                } else {
                    setError('');
                }
            }
            return updatedForm;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true); // Show loading state

        try {
            const { confirmPassword, ...dataToSend } = formData;
            const response = await fetch('http://localhost:5000/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(dataToSend)
            });

            if (response.ok) {
                navigate('/regsuccess');
            } else if (response.status === 409) {
                setError('Email is already registered. Please use another email.');
            } else {
                setError('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Error registering:', error);
            setError('Registration failed. Please try again.');
        } finally {
            setLoading(false); // Hide loading state
        }
    };

    return (
        <div className='h-screen w-screen bg-[#EDF2F6] flex'>
            <div className='flex flex-col md:flex-row h-full xl:h-3/4 w-full md:w-3/4 xl:w-2/3 m-auto shadow-lg bg-white'>
                <div className='bg-[#6A7EFC] h-16 w-full md:h-full md:w-1/7'></div>

                <div className='flex flex-col md:items-center gap-y-6 grow-1 py-6 lg:py-12 md:-ml-10'>
                    <div className='flex flex-col items-center gap-y-4'>
                        <h1 className='text-[#6A7EFC] font-semibold text-2xl md:text-3xl'>Register</h1>
                        <p className='text-xs text-[#8B8B8B] hidden md:block'>Please enter your details to create a new account</p>
                    </div>
                    <form onSubmit={handleSubmit} className='flex flex-col items-center lg:items-stretch  gap-y-6 mt-4 w-full lg:w-2/3'>
                        <div className='flex flex-col justify-between lg:flex-row gap-y-4'>
                            <InputField label='First Name' name='firstName' height={8} onChange={handleChange} />
                            <InputField label='Last Name' name='lastName' height={8} onChange={handleChange} />
                        </div>
                        <div className='flex flex-col justify-between h-50'>
                            <InputField label='Email Address' name='email' type='email' height={8} onChange={handleChange} />
                            <InputField label='Password' name='password' type='password' height={8} onChange={handleChange} />
                            <InputField label='Confirm Password' name='confirmPassword' type='password' height={8} onChange={handleChange} />
                            {error && <p className='text-red-500 text-xs w-52 md:w-full'>{error}</p>}
                        </div>

                        {/* Disable button while loading & show "Signing Up..." */}
                        <div className='flex justify-center w-1/3 md:w-1/2 lg:w-full'>
                            <Button btnLabel={loading ? 'Signing Up...' : 'Sign Up'} width={'full'} type='submit' disabled={loading} />
                        </div>

                    </form>
                </div>
                <div className='p-4'>
                    {/* Show loading message */}
                    {loading && <Spinner text="Registering.. Please wait" />}
                </div>
            </div>


        </div>
    );
};

export default Register;
