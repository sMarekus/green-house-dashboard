import React,{useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import HumidityIcon from '../../components/Icons/Humidity';
import ThresholdButton from '../../components/ThresholdButton';
import ThresholdModal from '../../components/ThresholdModal';
import { MeasurementService } from '../../api/Services/MeasurementService';
import { NotificationService } from '../../api/Services/NotificationService';

const Humidity: React.FC = () => {
    const [visible, setVisible] = useState(false);
    const [humidity, setHumidity] = useState<number | null>(null);
    
    useEffect(() => {
        const fetchHumidity = async () => {
            try {
                const latestHumidity = await MeasurementService.getLatestHumidityMeasurement();
                setHumidity(latestHumidity);
            } catch (error) {
                console.error('Failed to fetch latest humidity:', error);
            }
        };

        fetchHumidity(); // Initial fetch

        const intervalId = setInterval(fetchHumidity, 14400000); // Fetch every 4hrs

        return () => clearInterval(intervalId);
    }, []);

    const handleConfirm = async (threshold: number) => {
        try {
            await NotificationService.setHumidityNotification(threshold);
            console.log("Successfully set humidity notification threshold.");
            setVisible(false);
        } catch (error) {
            console.error('Failed to set humidity notification:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
        <Helmet>
            <title>Humidity - Greenhouse Dashboard</title>
        </Helmet>
        <h1 className='font-pt_sans_arrow text-secondary text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl mb-12' data-testid="humidity-title">Humidity</h1>
        <div className="mb-10">
            <HumidityIcon className="w-40 h-40" color='#BBBB' />
        </div>
        <div className="flex justify-center mb-28 font-pt_sans_arrow text-secondary text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl" data-testid="humidity-display">
        <p>{humidity !== null ? `${humidity} %` : 'Loading...'}</p>
        </div>
        <div className="w-full md:w-80 px-4 md:px-0">
            <ThresholdButton label="Set Notification Threshold" onClick={() => setVisible(true)} data-testid="open-threshold-modal-button"/>
            <ThresholdModal
                    visible={visible}
                    onHide={() => setVisible(false)}
                    placeholder="Set Maximum Humidity Percentage"
                    onConfirm={handleConfirm}
                    data-testid="threshold-modal"
            />
        </div>
    </div>
    );
};

export default Humidity;
