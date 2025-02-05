import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


const Searchbar = () => {
    return (
        <div className='flex mt-1'>
            <FontAwesomeIcon icon={faSearch} className='text-sm text-[#D7D7D7]' />
            <input type='text' placeholder='Search notes' className=' p-2 outline-none w-full h-4 text-md text-[#8B8B8B]' />
        </div>
    )
}

export default Searchbar