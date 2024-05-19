import React from 'react';

interface TriangleIcon {
    className?:string;
}

const TriangleIcon: React.FC<TriangleIcon> = ({ className }) => (
    <svg className={className} viewBox="0 0 230 194" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M97.9536 9.77928C105.759 -2.94026 124.241 -2.94023 132.046 9.77931L226.212 163.234C234.39 176.56 224.801 193.695 209.166 193.695H20.8343C5.19921 193.695 -4.38958 176.56 3.78782 163.234L97.9536 9.77928Z" fill="#75D7B7"/>
    </svg>
);

export default TriangleIcon;
