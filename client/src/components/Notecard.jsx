import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';

const Notecard = ({ bgColor }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [noteText, setNoteText] = useState(
        'This is my first note, a sample note written without calling the backend. Thank you very much'
    );

    const textareaRef = useRef(null);

    const handleIconClick = () => {
        setIsEditing(true);
        setTimeout(() => {
            textareaRef.current?.focus();  // Ensure focus after state updates
            textareaRef.current.setSelectionRange(noteText.length, noteText.length);
        }, 0);

    };

    const handleTextChange = (e) => {
        setNoteText(e.target.value);
    };

    return (
        <div className='flex flex-col p-7 h-64 w-86 justify-between text-[#1E1E1E] rounded-2xl' style={{ backgroundColor: bgColor }}>
            {isEditing ? (
                <textarea
                    ref={textareaRef}
                    className='w-full h-full p-2 outline-none border-none resize-none'
                    value={noteText}
                    onChange={handleTextChange}
                    onBlur={() => setIsEditing(false)} // Optional: Exit edit mode when losing focus
                />
            ) : (
                <p>{noteText}</p>
            )}
            <div className='flex justify-between items-end'>
                <p className='text-xs'>Feb 5, 2025</p>
                <FontAwesomeIcon
                    icon={faPenToSquare}
                    className='text-2xl cursor-pointer'
                    onClick={handleIconClick}
                />
            </div>
        </div>
    );
};

export default Notecard;
