import React from 'react'

const Button = ({ btnLabel, width = 35 }) => {
    return (
        <button className={`bg-[#6A7EFC] hover:bg-[#6aa2fc] text-xs font-bold text-white w-${width} py-3 cursor-pointer rounded-2xl active:translate-y-1`} type='submit'>{btnLabel}</button>
    )
}

export default Button