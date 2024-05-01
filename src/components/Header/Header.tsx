import React from 'react';
import Logo from '../../assets/logo/logo.svg';
import './Header.module.sass';  

const Header = () => {
    return (
        <header className='h-20 w-full border-b border-gray-400 fixed px-10'>
            <div className='flex items-center h-full gap-x-2'>
                <img src={Logo} alt="Logo" className='w-12 h-12' />
                <h1 className='font-pt_sans text-secondary text-xl'>GreenHouse</h1>
            </div>
        </header>
    );
};

export default Header;
