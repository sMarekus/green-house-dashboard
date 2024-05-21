import React,{useState} from 'react';
import HumidityIcon from '../../components/Icons/Humidity';
import ThresholdButton from '../../components/ThresholdButton';
import ThresholdModal from '../../components/ThresholdModal';

interface HumidityProps {
    
}

const Humidity: React.FC<HumidityProps> = () => {
    const [visible, setVisible] = useState(false);

    const handleConfirm = () => {
        // Logic for setting up threshold
        setVisible(false);
    };
    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <h1 className='font-pt_sans_arrow text-secondary text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl mb-12'>Humidity</h1>
        <div className="mb-10">
            <HumidityIcon className="w-40 h-40" color='#BBBB' />
        </div>
        <div className="flex justify-center mb-28 font-pt_sans_arrow text-secondary text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl">
            <p>40%</p>
        </div>
        <div className="w-full md:w-80 px-4 md:px-0">
            <ThresholdButton label="Set Notification Threshold" onClick={() => setVisible(true)}/>
            <ThresholdModal
                    visible={visible}
                    onHide={() => setVisible(false)}
                    placeholder="Set Maximum Humidity Percentage"
                    onConfirm={handleConfirm}
            />
        </div>
    </div>
    );
};

export default Humidity;