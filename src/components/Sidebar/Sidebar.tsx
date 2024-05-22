import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import HomeIcon from '../Icons/Home';
import ClockIcon from '../Icons/Clock';
import HumidityIcon from '../Icons/Humidity';
import SunIcon from '../Icons/Sun';
import WindowsIcon from '../Icons/Windows';
import LightBulbIcon from '../Icons/LightBulb';
import BoltIcon from '../Icons/Bolt';

import Logo from '../../assets/logo/logo.svg';

import './Sidebar.sass';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const [activeItem, setActiveItem] = useState<string>('Home');
  const navigate = useNavigate();

  const menuItems = [
    { name: 'Home', Icon: HomeIcon, path: '/', section: 'Menu' },
    { name: 'Information History', Icon: ClockIcon, path: '/information-history', section: 'Menu' },
    { name: 'Lighting', Icon: LightBulbIcon, path: '/lighting', section: 'Utilities' },
    { name: 'Heating', Icon: SunIcon, path: '/heating', section: 'Utilities' },
    { name: 'Humidity', Icon: HumidityIcon, path: '/humidity', section: 'Utilities' },
    { name: 'Windows', Icon: WindowsIcon, path: '/windows', section: 'Utilities' },
    { name: 'LED', Icon: BoltIcon, path: '/led', section: 'Utilities' }
  ];

  return (
    <aside className={`sidebar top-0 ${isOpen ? 'open' : 'closed'}`}>
      <div className='flex items-center h-20 gap-x-2 border-b px-5 lg:px-6 xl:px-8'>
        <img src={Logo} className='w-8 h-8 lg:w-10 lg:h-10 xl:w-12 xl:h-12' alt='Logo' />
        <span className='text-lg lg:text-lg xl:text-xl font-pt_sans text-secondary'>GreenHouse</span>
      </div>
      <div className='pt-6 lg:pt-5'>
        {/* Menu Section */}
        <div className="text-left text-[#858585] text-xs mb-2 uppercase tracking-wide font-pt_sans_arrow px-5 lg:px-8 xl:px-10">Menu</div>
        <div className="flex flex-col space-y-2 mb-6 px-3 lg:px-4 xl:px-6">
          {menuItems.filter(item => item.section === 'Menu').map(item => (
            <button
              key={item.name}
              className={`sidebar-item ${activeItem === item.name ? 'active' : ''}`}
              onClick={() => {
                setActiveItem(item.name);
                navigate(item.path);
              }}
            >
              <item.Icon color={activeItem === item.name ? '#10B981' : '#858585'} />
              <span className="font-pt_sans">{item.name}</span>
            </button>
          ))}
        </div>

        {/* Utilities Section */}
        <div className="text-left text-[#858585] text-xs mb-2 uppercase tracking-wide font-pt_sans_arrow px-5 lg:px-8 xl:px-10">Utilities</div>
        <div className="flex flex-col space-y-2 px-3 lg:px-4 xl:px-6">
          {menuItems.filter(item => item.section === 'Utilities').map(item => (
            <button
              key={item.name}
              className={`sidebar-item ${activeItem === item.name ? 'active' : ''}`}
              onClick={() => {
                setActiveItem(item.name);
                navigate(item.path);
              }}
            >
              <item.Icon color={activeItem === item.name ? '#10B981' : '#858585'} />
              <span className="font-pt_sans">{item.name}</span>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
