import React from 'react';
import ThresholdButton from '../../components/ThresholdButton'; // Update the path if needed
import LightBulbIcon from '../../components/Icons/LightBulb';
import Button from 'primereact/button';
import './Lighting.sass';

const Lighting: React.FC = () => {
    return (
        <div className="lighting-page">
            <h1 className='font-pt_sans_arrow text-secondary text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl mb-8'>Lighting</h1>
            <div className="mb-5">
                <LightBulbIcon className="lightbulb-icon" />
            </div>
            <div className="flex items-center mb-24 font-pt_sans_arrow text-secondary text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl">
                <button className="bg-none">+</button>
                <p className='mx-6 my-6'>584568</p>
                <button className="bg-none">-</button>
            </div>
            <div className="w-80">
                <ThresholdButton label="Set Notification Threshold" />
            </div>
        </div>
    );
};

export default Lighting;
