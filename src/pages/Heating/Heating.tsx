import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HeatingIcon from '../../components/Icons/Sun';
import ThresholdButton from '../../components/ThresholdButton';
import ThresholdModal from '../../components/ThresholdModal';
import { MeasurementService } from '../../api/Services/MeasurementService';
import { NotificationService } from '../../api/Services/NotificationService';

interface HeatingProps {}

const Heating: React.FC<HeatingProps> = () => {
    const [visible, setVisible] = useState(false);
    const [temperature, setTemperature] = useState<number | null>(null);
    const [error, setError] = useState<string>('');

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

    const handleConfirm = async (threshold: number) => {
        try {
            await NotificationService.setHeatingNotification(threshold);
            console.log("Successfully set heating notification threshold.");
            setVisible(false);
        } catch (error) {
            console.error('Failed to set heating notification:', error);
            setError('Something went wrong, please try again.');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen" data-testid="heating-component">
            <Helmet>
                <title>Heating - Greenhouse Dashboard</title>
            </Helmet>
            <h1 className="font-pt_sans_arrow text-secondary text-3xl md:text-4xl xl:text-5xl mb-8" data-testid="heating-title">Heating</h1>
            <div className="mb-5" data-testid="heating-icon">
                <HeatingIcon className="w-52 h-52" color="#BBBB" />
            </div>
            <div className="flex justify-center mb-28 font-pt_sans_arrow text-secondary text-3xl md:text-4xl xl:text-5xl" data-testid="temperature-display">
                <p>{temperature !== null ? `${temperature} °C` : 'Loading...'}</p>
            </div>
            {error && <p className="text-red-500 mt-2" data-testid="error-message">{error}</p>}
            <div className="w-full md:w-80 px-4 md:px-0" data-testid="threshold-button-container">
                <ThresholdButton label="Set Notification Threshold" onClick={() => setVisible(true)} data-testid="open-threshold-modal-button" />
                <ThresholdModal
                    visible={visible}
                    onHide={() => setVisible(false)}
                    placeholder="Set Maximum Heating Level"
                    onConfirm={handleConfirm}
                    data-testid="threshold-modal"
                />
            </div>
        </div>
    );
};

export default Heating;
