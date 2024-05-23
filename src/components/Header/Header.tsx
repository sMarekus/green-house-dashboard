import React from 'react';

import Hamburger from '../../assets/icons/hamburger.svg';
import XMark from '../../assets/icons/x-mark.svg'

import './Header.sass';

interface HeaderProps {
    toggleSidebar: () => void;
    isSidebarOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleSidebar, isSidebarOpen  }) => {
    return (
        <header className={isSidebarOpen ? 'opened' : 'closed'}>
            <div className='flex items-center h-full'>
                <button className='flex lg:hidden' onClick={toggleSidebar}>
                    <img src={isSidebarOpen ? XMark : Hamburger} alt="Menu" className='w-6 h-6' data-testid={isSidebarOpen ? 'x-mark-icon' : 'hamburger-icon'} />
                </button>
            </div>
        </header>
    );
};

export default Header;
