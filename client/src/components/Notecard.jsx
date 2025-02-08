import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Notecard = ({ bgColor, note }) => {

    return (
        <div className='flex flex-col p-7 h-64 w-2/7 justify-between text-[#1E1E1E] rounded-2xl' style={{ backgroundColor: bgColor }}>


            <h1 className='font-bold'>{note.title} </h1>
            <p>{note.content}</p>

            <div className='flex justify-between items-end'>
                <p className='text-xs'>Last Updated: {note.updatedAt.slice(0, 10)}</p>
                <FontAwesomeIcon
                    icon={faPenToSquare}
                    className='text-2xl cursor-pointer'
                // onClick={handleIconClick}
                />
            </div>
        </div>
    );
};

export default Notecard;
