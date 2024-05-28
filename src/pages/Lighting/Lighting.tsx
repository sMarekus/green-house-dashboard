import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import LightBulbIcon from '../../components/Icons/LightBulb';
import ThresholdButton from '../../components/ThresholdButton';
import ThresholdModal from '../../components/ThresholdModal';
import { MeasurementService } from '../../api/Services/MeasurementService';
import { NotificationService } from '../../api/Services/NotificationService';

const Lighting: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [light, setLight] = useState<number | null>(null);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        const fetchLight = async () => {
            try {
                const latestLight = await MeasurementService.getLatestLightingMeasurement();
                setLight(latestLight)
            } catch (error) {
                console.error('Failed to fetch latest light:', error);
            }
        };

        fetchLight(); // Initial fetch

        const intervalId = setInterval(fetchLight, 14400000); // Fetch every 4hrs

        return () => clearInterval(intervalId);
    }, []);

    const handleConfirm = async (threshold: number) => {
        try {
            await NotificationService.setLightingNotification(threshold);
            console.log("Successfully set lighting notification threshold.");
            setVisible(false);
        } catch (error) {
            console.error('Failed to set lighting notification:', error);
            setError('Something went wrong, please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Helmet>
                <title>Lighting - Greenhouse Dashboard</title>
            </Helmet>
            <h1 data-testid="lighting-title" className="font-pt_sans_arrow text-secondary text-3xl md:text-4xl xl:text-5xl mb-8">Lighting</h1>
            <div className="mb-5">
                <LightBulbIcon className="w-52 h-52" color="#BBBB" />
            </div>
            <div className="flex justify-center mb-28 font-pt_sans_arrow text-secondary text-3xl md:text-4xl xl:text-5xl">
                <p>{light !== null ? `${light} lx` : 'Loading...'}</p>
            </div>
            {error && <p className="text-red-500 mt-2" data-testid="error-message">{error}</p>}
            <div className="w-full md:w-80 px-4 md:px-0">
                <ThresholdButton label="Set Notification Threshold" onClick={() => setVisible(true)} data-testid="open-threshold-modal-button"/>
                <ThresholdModal
                    visible={visible}
                    onHide={() => setVisible(false)}
                    placeholder="Set Maximum Lighting Level"
                    onConfirm={handleConfirm}
                    data-testid="threshold-modal"
                />
            </div>
        </div>
    );
};

export default Lighting;
