import React from 'react';
import HeatingIcon from '../../components/Icons/Sun';
import ThresholdButton from '../../components/ThresholdButton';

interface HeatingProps {
    
}

const Heating: React.FC<HeatingProps> = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className='font-pt_sans_arrow text-secondary text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl mb-8'>Heating</h1>
            <div className="mb-5">
                <HeatingIcon className="w-52 h-52" color='#BBBB' />
            </div>
            <div className="flex justify-center mb-28 font-pt_sans_arrow text-secondary text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl">
                <p>25 °C</p>
            </div>
            <div className="w-80">
                <ThresholdButton label="Set Notification Threshold" />
            </div>
        </div>
    );
};

export default Heating;
