import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import Modal from './Modal'; // Import your existing Modal component

const Notecard = ({ bgColor, note, onEdit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [wordLimit, setWordLimit] = useState(20);
    useEffect(() => {
        const handleResize = () => {
            setWordLimit(getWordLimit(window.innerWidth));
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const getWordLimit = (width) => {

        if (width < 640) return 10; // Small screens
        if (width < 1024) return 15; // Medium screens
        return 20; // Large screens
    };
    const truncateContent = (content) => {

        console.log(wordLimit);
        const words = content.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return content;
    };

    return (
        <>
            <div
                className='flex flex-col p-7 h-74 2xl:h-68 md:w-full lg:w-2/5 2xl:w-2/7 justify-between text-[#1E1E1E] rounded-2xl cursor-pointer'
                style={{ backgroundColor: bgColor }}
                onClick={() => setIsModalOpen(true)}
            >
                <h1 className='font-bold'>{note.title} </h1>
                <p>{truncateContent(note.content)}</p>
                <div className='flex justify-between items-end'>
                    <p className='text-xs'>Last Updated: {note.updatedAt.slice(0, 10)}</p>
                    <div onClick={(e) => { e.stopPropagation(); onEdit(note); }}>
                        <FontAwesomeIcon
                            icon={faPenToSquare}
                            className='text-2xl cursor-pointer'
                        />
                    </div>
                </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} width="1/2" type="note">
                <div className="p-8 rounded-lg shadow-lg w-full h-full" style={{ backgroundColor: bgColor }}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-2xl font-bold">{note.title}</h2>
                        {/* <button onClick={() => setIsModalOpen(false)}>Close</button> */}
                    </div>
                    <p>{note.content}</p>
                </div>
            </Modal>
        </>
    );
};

export default Notecard;