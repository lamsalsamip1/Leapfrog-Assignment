import React from 'react'

const InputField = ({ label, placeholder = "", type = "text" }) => {
    return (
        <div className='flex flex-col gap-y-1'>
            <label className='text-xs'>{label}</label>
            <input type={type} placeholder={placeholder} className='p-2 w-50 border-1 border-gray-400' />
        </div>
    )
}

export default InputField