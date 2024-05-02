import React, { useState } from 'react';
import homeIcon from '../../assets/icons/home.svg';
import infoIcon from '../../assets/icons/clock.svg';
import lightIcon from '../../assets/icons/lightbulb.svg';
import heatIcon from '../../assets/icons/sun.svg';
import humidityIcon from '../../assets/icons/humidity.svg';
import windowIcon from '../../assets/icons/windows.svg';

const Sidebar: React.FC = () => {
  const [activeItem, setActiveItem] = useState<string>('Home');

  const menuItems = [
    { name: 'Home', icon: homeIcon, section: 'Menu' },
    { name: 'Information history', icon: infoIcon, section: 'Menu' },
    { name: 'Lighting', icon: lightIcon, section: 'Utilities' },
    { name: 'Heating', icon: heatIcon, section: 'Utilities' },
    { name: 'Humidity', icon: humidityIcon, section: 'Utilities' },
    { name: 'Windows', icon: windowIcon, section: 'Utilities' },
  ];

  return (
    <div className="bg-white w-64 min-h-screen shadow-lg p-6">
      <div className="text-left text-gray-400 text-xs mb-2 uppercase tracking-wide font-semibold">Menu</div>
      <div className="flex flex-col space-y-2 mb-6">
        {menuItems.filter(item => item.section === 'Menu').map((item, index) => (
          <a key={index}
             href="#"
             className={`flex items-center space-x-3 py-3 px-4 rounded text-gray-400
                         ${activeItem === item.name ? 'bg-green-100' : 'hover:bg-gray-50'}`}
             onClick={() => setActiveItem(item.name)}
          >
            <img src={item.icon} alt={item.name} className="h-5 w-5" />
            <span className="text-xs">{item.name}</span>
          </a>
        ))}
      </div>
      <div className="text-left text-gray-400 text-xs mb-2 uppercase tracking-wide font-semibold">Utilities</div>
      <div className="flex flex-col space-y-2">
        {menuItems.filter(item => item.section === 'Utilities').map((item, index) => (
          <a key={index}
             href="#"
             className={`flex items-center space-x-3 py-3 px-4 rounded text-gray-400
                         ${activeItem === item.name ? 'bg-green-100' : 'hover:bg-gray-50'}`}
             onClick={() => setActiveItem(item.name)}
          >
            <img src={item.icon} alt={item.name} className="h-5 w-5" />
            <span className="text-xs">{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
