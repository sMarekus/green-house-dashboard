import React, { useState, useEffect } from 'react';
import { BoardService } from '../../api/Services/BoardService';
import BoltIcon from '../../components/Icons/Bolt';
import { Helmet } from 'react-helmet';

const Led: React.FC = () => {
    const [ledStatus, setLedStatus] = useState<number | null>(null);
    const [windowStatus, setWindowStatus] = useState<number | null>(null);

    useEffect(() => {
        const fetchStatuses = async () => {
            try {
                const { windowStatus, ledStatus } = await BoardService.getStatuses();
                setWindowStatus(windowStatus);
                setLedStatus(ledStatus);
            } catch (error) {
                if (error instanceof Error) {
                    console.error(error.message);
                } else {
                    console.error('An unexpected error occurred');
                }
            }
        };

        fetchStatuses();
    }, []);

    const handleLedOn = async () => {
        if (windowStatus === null) return;
        try {
            await BoardService.updateStatus(windowStatus, 1);
            setLedStatus(1);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error('An unexpected error occurred');
            }
        }
    };

    const handleLedOff = async () => {
        if (windowStatus === null) return;
        try {
            await BoardService.updateStatus(windowStatus, 0);
            setLedStatus(0);
        } catch (error) {
            if (error instanceof Error) {
                console.error(error.message);
            } else {
                console.error('An unexpected error occurred');
            }
        }
    };

    const renderLedStatus = () => {
        if (ledStatus === null) return 'Loading...';
        return ledStatus === 1 ? 'LED is ON' : 'LED is OFF';
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <Helmet>
                <title>LED - Greenhouse Dashboard</title>
            </Helmet>
            <h1 data-testid="led-title" className='font-pt_sans_arrow text-secondary text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl mb-8'>LED</h1>
            <div className="mb-5" data-testid="bolt-icon">
                <BoltIcon className="w-52 h-52" color={ledStatus === 1 ? '#10B981' : '#BBBBBB'} />
            </div>
            <div className="flex items-center mb-6 font-pt_sans_arrow text-secondary text-xl md:text-2xl xl:text-3xl 2xl:text-4xl text-center px-4">
                <p className='mx-6 my-6' data-testid="led-status">{renderLedStatus()}</p>
            </div>
            <div className='flex rounded-b-lg gap-x-2 md:gap-x-4 lg:gap-x-2 xl:gap-x-3 2xl:gap-x-4 p-4 lg:p-3 xl:p-4'>
                <button
                    data-testid="led-on-button"
                    className='font-pt_sans border-primary text-primary bg-[#10b9811a] border md:text-base lg:text-sm xl:text-base py-1 2xl:py-1.5 w-20 md:w-28 lg:w-24 xl:w-28 2xl:w-32 rounded-lg lg:rounded-md xl:rounded-lg'
                    onClick={handleLedOn}
                >
                    On
                </button>
                <button
                    data-testid="led-off-button"
                    className='font-pt_sans border-[#FF0000] text-[#FF0000] bg-[#e11d481a] border md:text-base lg:text-sm xl:text-base py-1 2xl:py-1.5 w-20 md:w-28 lg:w-24 xl:w-28 2xl:w-32 rounded-lg lg:rounded-md xl:rounded-lg'
                    onClick={handleLedOff}
                >
                    Off
                </button>
            </div>
        </div>
    );
};

export default Led;
