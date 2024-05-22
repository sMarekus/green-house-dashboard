import React, { useState, useEffect } from 'react';
import HeatingIcon from '../../components/Icons/Sun';
import ThresholdButton from '../../components/ThresholdButton';
import ThresholdModal from '../../components/ThresholdModal';
import { MeasurementService } from '../../api/Services/MeasurementService';

interface HeatingProps {}

const Heating: React.FC<HeatingProps> = () => {
    const [visible, setVisible] = useState(false);
    const [temperature, setTemperature] = useState<number | null>(null);

    useEffect(() => {
        const fetchTemperature = async () => {
            try {
                const latestTemperature = await MeasurementService.getLatestTemperatureMeasurement();
                setTemperature(latestTemperature);
            } catch (error) {
                console.error('Failed to fetch latest temperature:', error);
            }
        };

        fetchTemperature(); // Initial fetch

        const intervalId = setInterval(fetchTemperature, 14400000); // Fetch every 4hrs

        return () => clearInterval(intervalId);
    }, []);

    const handleConfirm = () => {
        // Logic for setting up threshold
        setVisible(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="font-pt_sans_arrow text-secondary text-3xl md:text-4xl xl:text-5xl mb-8">Heating</h1>
            <div className="mb-5">
                <HeatingIcon className="w-52 h-52" color="#BBBB" />
            </div>
            <div className="flex justify-center mb-28 font-pt_sans_arrow text-secondary text-3xl md:text-4xl xl:text-5xl">
                <p>{temperature !== null ? `${temperature} °C` : 'Loading...'}</p>
            </div>
            <div className="w-full md:w-80 px-4 md:px-0">
                <ThresholdButton label="Set Notification Threshold" onClick={() => setVisible(true)} />
                <ThresholdModal
                    visible={visible}
                    onHide={() => setVisible(false)}
                    placeholder="Set Maximum Heating Level"
                    onConfirm={handleConfirm}
                />
            </div>
        </div>
    );
};

export default Heating;
