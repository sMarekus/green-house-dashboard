import React from 'react';
import './Header.module.sass';  

const Header = () => {
    return (
        <header className='h-20 w-full border-b border-[#0000001A] fixed px-5 lg:px-10 bg-white'>
            <div className='flex items-center h-full'>
                <button className='flex lg:hidden'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5" />
                    </svg>
                </button>
            </div>
        </header>
    );
};

export default Header;
