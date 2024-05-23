import React from 'react';

interface TriangleWhiteTopIconProps {
    className?:string;
}

const TriangleWhiteTopIcon: React.FC<TriangleWhiteTopIconProps> = ({ className }) => (
    <svg className={ className } viewBox="0 0 402 335" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M183.954 9.77934C191.759 -2.9402 210.241 -2.94023 218.046 9.77931L398.815 304.364C406.992 317.69 397.403 334.824 381.768 334.824H20.2317C4.59667 334.824 -4.99212 317.69 3.18528 304.364L183.954 9.77934Z" fill="#75D7B7"/>
        <path d="M183.954 9.77934C191.759 -2.9402 210.241 -2.94023 218.046 9.77931L398.815 304.364C406.992 317.69 397.403 334.824 381.768 334.824H20.2317C4.59667 334.824 -4.99212 317.69 3.18528 304.364L183.954 9.77934Z" fill="url(#paint0_linear_111_117)"/>
        <defs>
            <linearGradient id="paint0_linear_111_117" x1="201" y1="-18" x2="201" y2="93.9234" gradientUnits="userSpaceOnUse">
                <stop stop-color="white"/>
                <stop offset="1" stop-color="white" stop-opacity="0"/>
            </linearGradient>
        </defs>
    </svg>
);

export default TriangleWhiteTopIcon;
