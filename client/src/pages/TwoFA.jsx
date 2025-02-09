import React, { useState } from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreen } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import Modal from '../components/Modal';

const TwoFA = () => {

    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [otp, setOtp] = useState("");

    const handleChange = (e) => {
        const { value } = e.target;
        if ((/^\d+$/
            .test(value)) || value === "") {
            setOtp(value);
        }
    }

    const verifyOTP = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5000/api/user/verify-otp", {
                method: "POST",
                credentials: "include", // Allows cookies to be included
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otp })
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setError(false);
                setMessage("Login successful ! ");

                setTimeout(() => {
                    navigate("/notes");
                }
                    , 2000);
            }
            else {
                setError(true);
                setMessage(data.msg);
            }
        }
        catch (error) {
            console.error("Error haha:", error);
            // alert(error.msg);
            setMessage("Failed to verify OTP. Please try again.");
            setError(true);
        }
        setLoading(false);
    }

    return (
        <div className='h-screen w-screen bg-[#EDF2F6] flex '>
            {/* {message && (
                <div className={`fixed left-2/5 auto h-12 w-1/5   text-white text-center py-3 z-10 transition-discrete ease-in ${isError ? 'bg-red-400' : 'bg-[#6A7EFC]'} `}>{message}</div>
            )} */}
            <Modal isOpen={message} onClose={() => setMessage("")} width='1/2'>
                <div className="p-8 rounded-lg shadow-lg w-full  bg-white">
                    <div className="flex justify-between items-center mb-4 mr-4">
                        <h2 className={`text-md md:text-2xl ${!isError ? 'text-[#6A7EFC]' : 'text-red-500'} font-bold`}>{message}</h2>

                    </div>
                    <p className='text-sm md:text-lg'>{!isError ? 'You will be redirected to the notes page.' : 'Please try again.'}</p>
                </div>
            </Modal>


            <div className=' flex h-2/3 w-full md:w-2/3 m-auto shadow-lg bg-white'>

                <div className='bg-[#6A7EFC] h-full w-1/7 hidden md:block'></div>

                <div className='flex flex-col items-center justify-between py-12 px-10 grow-1  '>
                    <div className='flex flex-col items-center gap-y-8'>
                        <h1 className='text-[#6A7EFC] font-semibold text-center text-xl md:text-3xl'>Two Factor Authentication</h1>
                        <p className='text-sm text-[#8B8B8B] text-center'>Please enter your one time password from your authenticator app.</p>
                    </div>

                    <div>
                        <FontAwesomeIcon
                            icon={faMobileScreen}
                            className="text-[#6A7EFC] text-5xl md:text-7xl "
                        />

                    </div>
                    <form className='flex flex-col gap-y-6 mt-4' onSubmit={verifyOTP}>
                        <InputField type='text' value={otp} onChange={handleChange} />
                        <Button btnLabel={"Verify"} width={25} />

                    </form>
                </div>
                <div className='absolute top-0 right-0 p-4'>
                    {/* Show loading message */}
                    {loading && <Spinner text="Verifying.. Please wait" />}
                </div>

            </div>


        </div>
    )
}

export default TwoFA