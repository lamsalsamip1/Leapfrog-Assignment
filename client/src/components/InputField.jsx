import React, { useState } from 'react'

const InputField = ({ label, placeholder = "", type = "text", height = 10, name, value, onChange, mode = "" }) => {
    const [error, setError] = useState("");

    const handlePasswordValidation = (e) => {
        const password = e.target.value;
        if (password.length < 8) {
            setError("Password must be at least 8 characters long");
        } else if (!/[A-Z]/.test(password)) {
            setError("Password must contain at least one uppercase letter");
        } else {
            setError("");
        }
        onChange(e);
    };

    const handleChange = (e) => {
        if (type === "password") {
            handlePasswordValidation(e);
        } else {
            onChange(e);
        }
    };

    return (
        <div className='flex flex-col gap-y-1'>
            <label className='text-xs'>{label}</label>
            <input type={type} value={value} onChange={handleChange} name={name} placeholder={placeholder} className={`p-2 w-53 border-1 border-gray-400 placeholder:text-sm text-sm h-${height} `} />
            {type === "password" && mode === "register" && error && <span className='text-red-500 text-xs'>{error}</span>}
        </div>
    )
}

export default InputField