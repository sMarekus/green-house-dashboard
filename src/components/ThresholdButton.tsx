import React from 'react';
import { Button } from 'primereact/button';

interface ThresholdButtonProps {
    label: string;
    className?: string;
    onClick?: () => void; // Add onClick prop
}

const ThresholdButton: React.FC<ThresholdButtonProps> = ({ label, className, onClick }) => {
    return (
        <Button 
            className={`w-full bg-primary hover:border-primary focus:shadow-none font-pt_sans ${className}`}
            type="button"
            label={label} 
            onClick={onClick}
        />
    );
};

export default ThresholdButton;
