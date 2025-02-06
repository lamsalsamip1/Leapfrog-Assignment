import React from 'react'

const InputField = ({ label, placeholder = "", type = "text", height = 10 }) => {
    return (
        <div className='flex flex-col gap-y-1'>
            <label className='text-xs'>{label}</label>
            <input type={type} placeholder={placeholder} className={`p-2 w-56 border-1 border-gray-400 placeholder:text-sm text-sm h-${height} `} />
        </div>
    )
}

export default InputField