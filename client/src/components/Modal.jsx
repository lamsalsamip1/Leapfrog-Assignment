import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Modal = ({ isOpen, children, onClose, width = "2/3" }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/90 flex justify-center items-center transition-opacity duration-300">
            <div className={`flex justify-between bg-gray-50  rounded-lg shadow-lg transition-transform duration-300 relative h-1/4 w-${width} `} >
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-gray-700 hover:text-gray-800 transition cursor-pointer"
                >
                    <FontAwesomeIcon icon={faTimes} />
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;