import React, { useState,useEffect } from 'react';
import BoltIcon from '../../components/Icons/Bolt';

const Led: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className='font-pt_sans_arrow text-secondary text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl mb-8'>LED</h1>
            <div className="mb-5">
                <BoltIcon className="w-52 h-52" color={isOpen ? '#10B981' : '#BBBBBB'} />
            </div>
            <div className="flex items-center mb-6 font-pt_sans_arrow text-secondary text-xl md:text-2xl xl:text-3xl 2xl:text-4xl text-center px-4">
                <p className='mx-6 my-6'>Currently, The LED is {isOpen ? 'ON' : 'OFF'}</p>
            </div>
            <div className='flex rounded-b-lg gap-x-2 md:gap-x-4 lg:gap-x-2 xl:gap-x-3 2xl:gap-x-4 p-4 lg:p-3 xl:p-4'>
                <button
                    className='font-pt_sans border-primary text-primary bg-[#10b9811a] border md:text-base lg:text-sm xl:text-base py-1 2xl:py-1.5 w-20 md:w-28 lg:w-24 xl:w-28 2xl:w-32 rounded-lg lg:rounded-md xl:rounded-lg'
                    onClick={handleOpen}
                >
                    On
                </button>
                <button
                    className='font-pt_sans border-[#FF0000] text-[#FF0000] bg-[#e11d481a] border md:text-base lg:text-sm xl:text-base py-1 2xl:py-1.5 w-20 md:w-28 lg:w-24 xl:w-28 2xl:w-32 rounded-lg lg:rounded-md xl:rounded-lg'
                    onClick={handleClose}
                >
                    Off
                </button>
            </div>
        </div>
    );
};

export default Led;
