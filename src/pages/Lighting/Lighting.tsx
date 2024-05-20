import React from 'react';
import ThresholdButton from '../../components/ThresholdButton';
import LightBulbIcon from '../../components/Icons/LightBulb';

const Lighting: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className='font-pt_sans_arrow text-secondary text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl mb-8'>Lighting</h1>
            <div className="mb-5">
                <LightBulbIcon className="w-52 h-52" color='#BBBB' />
            </div>
            <div className="flex items-center mb-24 font-pt_sans_arrow text-secondary text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl">
                <button className="bg-none">+</button>
                <p className='mx-6 my-6'>584568</p>
                <button className="bg-none">-</button>
            </div>
            <div className="w-full md:w-80 px-4 md:px-0">
                <ThresholdButton label="Set Notification Threshold" />
            </div>
        </div>
    );
};

export default Lighting;
