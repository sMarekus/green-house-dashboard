import React from 'react';
import { Button } from 'primereact/button';

interface ThresholdButtonProps {
    label: string;
    className?: string;
}

const ThresholdButton: React.FC<ThresholdButtonProps> = ({ label, className }) => {
    return (
        <Button 
            className={`w-full bg-primary hover:border-primary focus:shadow-none font-pt_sans ${className}`}
            type="submit" 
            label={label} 
        />
    );
};

export default ThresholdButton;
