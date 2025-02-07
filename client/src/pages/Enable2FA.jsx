import React, { useState, useEffect } from 'react'
import InputField from '../components/InputField'
import Button from '../components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMobileScreen } from '@fortawesome/free-solid-svg-icons';
import Spinner from '../components/Spinner';
import { useNavigate } from 'react-router-dom';
import testQR from '../assets/testqr.png';



const Enable2FA = () => {

    const [qrCodeURL, setQrCodeURL] = useState("");
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [isError, setError] = useState(false);
    const [otp, setOtp] = useState("");

    useEffect(() => {
        // Fetch the QR code URL
        const fetchQRCode = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/user/enable-2fa", {
                    method: "POST",
                    credentials: "include", // Allows cookies to be included
                });
                const data = await response.json();
                console.log(data);
                if (response.ok) {
                    setQrCodeURL(data.qrCode);
                }
                else {
                    setError(true);
                    setMessage(data.msg);
                }
            }
            catch (error) {
                console.error("Error:", error);
                setError(true);
                setMessage("Failed to fetch QR code. Please try again.");
            }
        }
        fetchQRCode();
    }, []);


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
            const response = await fetch("http://localhost:5000/api/user/connect-otp", {
                method: "POST",
                credentials: "include", // Allows cookies to be included
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ otp })
            });

            const data = await response.json();
            console.log(data);
            if (response.ok) {
                setError(false);
                setMessage("Two factor authenication Enabled ! Redirecting.... ");

                setTimeout(() => {
                    navigate("/profile");
                }
                    , 3000);
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
            {message && (
                <div className={`fixed left-1/3 auto h-12 w-2/5   text-white text-center py-3 z-10 transition-discrete ease-in ${isError ? 'bg-red-400' : 'bg-[#6A7EFC]'} `}>{message}</div>
            )}

            <div className=' flex h-2/3 w-2/3 m-auto shadow-lg bg-white'>

                <div className='bg-[#6A7EFC] h-full w-1/7'></div>

                <div className='flex flex-col items-center justify-between py-12 grow-1  '>
                    <div className='flex flex-col items-center gap-y-8'>
                        <h1 className='text-[#6A7EFC] font-semibold text-3xl'>Enable Two Factor Authentication</h1>
                        <p className='text-sm text-[#8B8B8B]'>Please scan the QR code with an authenticator app and enter the code. </p>
                    </div>

                    <div>
                        <img src={qrCodeURL} alt="" />

                    </div>
                    <form className='flex flex-col gap-y-6 mt-4' onSubmit={verifyOTP}>
                        <InputField type='text' value={otp} onChange={handleChange} />
                        <Button btnLabel={"Enable"} width={5} type="submit" />

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

export default Enable2FA