import React from 'react';

interface SunIconProps {
    className?:string;
}

const SunIcon: React.FC<SunIconProps> = ({ className }) => (
    <svg className={className} viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="22.5" fill="#FFE79E" stroke="#FFCA9B" stroke-width="5"/>
    </svg>
);

export default SunIcon;
