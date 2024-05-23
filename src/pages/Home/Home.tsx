// src/pages/Home/Home.tsx
import React, { useEffect, useState } from 'react';
import { BoardService } from '../../api/Services/BoardService';
import { MeasurementService } from '../../api/Services/MeasurementService';
import { NotificationService } from '../../api/Services/NotificationService';
import { Skeleton } from 'primereact/skeleton';
import { Helmet } from 'react-helmet';
import './Home.sass';

interface Notification {
    threshold: number;
    measurementType: string;
    message: string;
}

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const [lighting, setLighting] = useState<number | null>(null);
    const [led, setLed] = useState<number | null>(null);
    const [windowStatus, setWindowStatus] = useState<number | null>(null);
    const [humidity, setHumidity] = useState<number | null>(null);
    const [heating, setHeating] = useState<number | null>(null);
    const [notifications, setNotifications] = useState<Notification[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statuses, lightingMeasurement, humidityMeasurement, heatingMeasurement, notifications] = await Promise.all([
                    BoardService.getStatuses(),
                    MeasurementService.getLatestLightingMeasurement(),
                    MeasurementService.getLatestHumidityMeasurement(),
                    MeasurementService.getLatestTemperatureMeasurement(),
                    NotificationService.getNotifications(),
                ]);

                setLighting(lightingMeasurement);
                setLed(statuses.ledStatus);
                setWindowStatus(statuses.windowStatus);
                setHumidity(humidityMeasurement);
                setHeating(heatingMeasurement);
                setNotifications(notifications);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='pt-[100px] px-5 lg:pl-[272px] xl:pl-[344px] lg:pr-4 xl:pr-6'>
        <Helmet>
            <title>Home - Greenhouse Dashboard</title>
        </Helmet>
            <h1 className='font-pt_sans_arrow text-secondary text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl'>Welcome Back!</h1>

            <div className='flex flex-col md:flex-row justify-between gap-y-8 md:gap-y-0 md:gap-x-4 lg:gap-x-5 xl:gap-x-6 2xl:gap-x-10 pt-3 md:pt-4 lg:pt-5 xl:pt-6 2xl:pt-8'>
                <div className='box'>
                    <h4>Lighting</h4>
                    <span>{lighting !== null ? `${lighting} lx` : <Skeleton width='100%' height='4rem' data-testid='skeleton-element' />}</span>
                </div>

                <div className='box'>
                    <h4>LED</h4>
                    <span>{led !== null ? (led === 1 ? 'ON' : 'OFF') : <Skeleton width='100%' height='4rem' data-testid='skeleton-element' />}</span>
                </div>

                <div className='box'>
                    <h4>Window</h4>
                    <span>{windowStatus !== null ? (windowStatus === 1 ? 'OPEN' : 'CLOSED') : <Skeleton width='100%' height='4rem' data-testid='skeleton-element' />}</span>
                </div>

                <div className='box'>
                    <h4>Humidity</h4>
                    <span>{humidity !== null ? `${humidity}%` : <Skeleton width='100%' height='4rem' data-testid='skeleton-element' />}</span>
                </div>

                <div className='box'>
                    <h4>Heating</h4>
                    <span>{heating !== null ? `${heating}°C` : <Skeleton width='100%' height='4rem' data-testid='skeleton-element' />}</span>
                </div>
            </div>

            <div className='flex flex-col pt-10 pb-10'>
                <div className='flex gap-x-1 xl:gap-x-1.5 2xl:gap-x-2'>
                    <h1 className='font-pt_sans_arrow text-secondary text-3xl xl:text-4xl 2xl:text-5xl'>Notifications</h1>
                    <div className='bg-primary text-sm xl:text-base w-6 h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 rounded-full flex items-center justify-center font-pt_sans_arrow text-white font-semibold'>
                        {notifications.length}
                    </div>
                </div>

                <div className='notifications flex flex-col gap-y-4 pt-4'>
                    {notifications.map((notification, index) => (
                        <div key={index} className='w-full p-4 bg-[#FDFDFD] border-[#DEDEDE] border rounded-lg'>
                            <h3 className='font-pt_sans_arrow text-secondary font-medium md:text-lg xl:text-xl'>{notification.measurementType}</h3>
                            <p className='font-pt_sans text-gray-600 text-base'>{notification.message}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;
