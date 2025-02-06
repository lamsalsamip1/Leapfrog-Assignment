import React from 'react'

const Button = ({ btnLabel }) => {
    return (
        <button className='bg-[#6A7EFC] hover:bg-[#6aa2fc] text-xs font-bold text-white w-35 py-3 cursor-pointer rounded-2xl active:translate-y-1' onClick={(event) => event.preventDefault()}>{btnLabel}</button>
    )
}

export default Button