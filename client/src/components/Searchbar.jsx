import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'

const Searchbar = ({ value, onChange }) => {
    return (
        <div className='flex mt-1 w-2/3'>
            <FontAwesomeIcon icon={faSearch} className='text-sm text-[#D7D7D7]' />
            <input
                type='text'
                placeholder='Search notes by title or content'
                className='p-2 outline-none w-full h-4 text-md text-[#8B8B8B]'
                value={value}
                onChange={onChange}
            />
        </div>
    )
}

export default Searchbar