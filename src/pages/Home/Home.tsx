import React, { useEffect, useState } from 'react';
import { BoardService } from '../../api/Services/BoardService';
import { MeasurementService } from '../../api/Services/MeasurementService';
import { Skeleton } from 'primereact/skeleton';
import './Home.sass';

interface HomeProps {}

const Home: React.FC<HomeProps> = () => {
    const [lighting, setLighting] = useState<number | null>(null);
    const [led, setLed] = useState<number | null>(null);
    const [windowStatus, setWindowStatus] = useState<number | null>(null);
    const [humidity, setHumidity] = useState<number | null>(null);
    const [heating, setHeating] = useState<number | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statuses, lightingMeasurement, humidityMeasurement, heatingMeasurement] = await Promise.all([
                    BoardService.getStatuses(),
                    MeasurementService.getLatestLightingMeasurement(),
                    MeasurementService.getLatestHumidityMeasurement(),
                    MeasurementService.getLatestTemperatureMeasurement(),
                ]);

                setLighting(lightingMeasurement);
                setLed(statuses.ledStatus);
                setWindowStatus(statuses.windowStatus);
                setHumidity(humidityMeasurement);
                setHeating(heatingMeasurement);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='pt-[100px] px-5 lg:pl-[272px] xl:pl-[344px] lg:pr-4 xl:pr-6'>
            <h1 className='font-pt_sans_arrow text-secondary text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl'>Welcome Back!</h1>

            <div className='flex flex-col md:flex-row justify-between gap-y-8 md:gap-y-0 md:gap-x-4 lg:gap-x-5 xl:gap-x-6 2xl:gap-x-10 pt-3 md:pt-4 lg:pt-5 xl:pt-6 2xl:pt-8'>
                <div className='box'>
                    <h4>Lighting</h4>
                    <span>{lighting !== null ? `${lighting} lx` : <Skeleton width='100%' height='4rem' />}</span>
                </div>

                <div className='box'>
                    <h4>LED</h4>
                    <span>{led !== null ? (led === 1 ? 'ON' : 'OFF') : <Skeleton width='100%' height='4rem' />}</span>
                </div>

                <div className='box'>
                    <h4>Window</h4>
                    <span>{windowStatus !== null ? (windowStatus === 1 ? 'OPEN' : 'CLOSED') : <Skeleton width='100%' height='4rem' />}</span>
                </div>

                <div className='box'>
                    <h4>Humidity</h4>
                    <span>{humidity !== null ? `${humidity}%` : <Skeleton width='100%' height='4rem' />}</span>
                </div>

                <div className='box'>
                    <h4>Heating</h4>
                    <span>{heating !== null ? `${heating}°C` : <Skeleton width='100%' height='4rem' />}</span>
                </div>
            </div>

            <div className='flex flex-col pt-10 pb-10'>
                <div className='flex gap-x-1 xl:gap-x-1.5 2xl:gap-x-2'>
                    <h1 className='font-pt_sans_arrow text-secondary text-3xl xl:text-4xl 2xl:text-5xl'>Notifications</h1>
                    <div className='bg-primary text-sm xl:text-base w-6 h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 rounded-full flex items-center justify-center font-pt_sans_arrow text-white font-semibold'>
                        5
                    </div>
                </div>

                <div className='notifications flex flex-col pt-4'>
                    <div className='w-full p-4 bg-[#FDFDFD] border-[#DEDEDE] border rounded-lg'>
                        <h3 className='font-pt_sans_arrow text-secondary font-medium md:text-lg xl:text-xl'>Heating</h3>
                        <p className='font-pt_sans text-gray-600 text-base'>Custom message</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
