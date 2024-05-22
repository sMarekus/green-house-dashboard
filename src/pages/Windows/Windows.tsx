import React, { useEffect, useState } from 'react';
import { BoardService } from '../../api/Services/BoardService';
import './Windows.sass';

import TriangleIcon from './assets/images/Triangle';
import SunIcon from './assets/images/Sun';
import TriangleWhiteTop from './assets/images/TriangleWhiteTop';

interface WindowsProps {}

const Windows: React.FC<WindowsProps> = () => {
  const [windowStatus, setWindowStatus] = useState<number | null>(null);
  const [ledStatus, setLedStatus] = useState<number | null>(null);

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

  const handleOpenWindow = async () => {
    if (ledStatus === null) return; // Ensure we have the ledStatus before making the request
    try {
      await BoardService.updateWindowStatus(1, ledStatus);
      setWindowStatus(1);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unexpected error occurred');
      }
    }
  };

  const handleCloseWindow = async () => {
    if (ledStatus === null) return; // Ensure we have the ledStatus before making the request
    try {
      await BoardService.updateWindowStatus(0, ledStatus);
      setWindowStatus(0);
    } catch (error) {
      if (error instanceof Error) {
        console.error(error.message);
      } else {
        console.error('An unexpected error occurred');
      }
    }
  };

  const renderWindowStatus = () => {
    if (windowStatus === null) return 'Loading...';
    return windowStatus === 1 ? 'Window is open' : 'Window is closed';
  };

  return (
    <div className='pt-[100px] px-5 lg:pl-[272px] xl:pl-[344px] lg:pr-4 xl:pr-6'>
      <h1 className='font-pt_sans_arrow text-secondary text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl'>Window</h1>

      <div className='flex flex-col'>
        <div className='pt-3 md:pt-4 lg:pt-5 xl:pt-6 2xl:pt-8'>
          <div className='bg-[#F8F8F8] relative rounded-t-lg overflow-hidden h-40 xl:h-52 2xl:h-60'>
            <h5 className='absolute border border-gray-200 font-pt_sans bg-[#F8F8F8] z-[5] m-auto left-0 right-0 top-0 bottom-0 w-fit h-fit md:text-base lg:text-sm xl:text-base px-2 py-1 md:px-4 lg:px-2 xl:px-4 md:py-2 lg:py-1 xl:py-2 rounded-lg md:rounded-lg lg:rounded-md xl:rounded-lg'>
              {renderWindowStatus()}
            </h5>

            <div className='absolute z-[1] bg-[#B8EEFF] bottom-0 h-8 md:h-12 lg:h-9 xl:h-14 2xl:h-16 w-full'></div>
            <SunIcon className='absolute w-6 md:w-8 xl:w-10 2xl:w-12 top-2 xl:top-4 2xl:top-5 right-6 md:right-8 lg:right-4 xl:right-8 2xl:right-10' />
            <TriangleIcon className='z-[2] absolute -left-6 md:-left-8 lg:-left-6 xl:-left-10 2xl:-left-12 -bottom-4 md:-bottom-3 lg:-bottom-4 xl:-bottom-6 2xl:-bottom-8 w-24 md:w-28 lg:w-32 xl:w-36 2xl:w-40' />
            <TriangleIcon className='z-[2] absolute -right-1 md:-right-2 lg:-right-2 xl:-right-4 2xl:-right-6 -bottom-4 md:-bottom-3 lg:-bottom-4 xl:-bottom-6 2xl:-bottom-8 w-24 md:w-28 lg:w-32 xl:w-36 2xl:w-40' />
            <TriangleWhiteTop className='absolute z-0 w-52 md:w-64 lg:w-52 xl:w-64 2xl:w-72 -bottom-10 md:-bottom-16 lg:-bottom-8 xl:-bottom-6 2xl:-bottom-4 left-6 md:left-12 lg:left-16 xl:left-14 2xl:left-11' />
            <TriangleWhiteTop className='absolute hidden md:flex z-0 w-36 md:w-48 lg:w-36 xl:w-48 2xl:w-56 md:-bottom-10 lg:-bottom-2 xl:-bottom-5 2xl:-bottom-4 md:left-40 lg:left-44 2xl:left-40' />
            <div className={`coverage absolute w-full h-full z-[3] backdrop-blur-xl ${windowStatus === 0 ? 'visible' : 'hidden'}`}></div>
          </div>
          <div className='flex bg-[#F8F8F8] rounded-b-lg gap-x-2 md:gap-x-4 lg:gap-x-2 xl:gap-x-3 2xl:gap-x-4 p-4 lg:p-3 xl:p-4'>
            <button
              className='font-pt_sans border-primary text-primary bg-[#10b9811a] border md:text-base lg:text-sm xl:text-base py-1 2xl:py-1.5 w-20 md:w-28 lg:w-24 xl:w-28 2xl:w-32 rounded-lg lg:rounded-md xl:rounded-lg'
              onClick={handleOpenWindow}
            >
              Open
            </button>

            <button
              className='font-pt_sans border-[#FF0000] text-[#FF0000] bg-[#e11d481a] border md:text-base lg:text-sm xl:text-base py-1 2xl:py-1.5 w-20 md:w-28 lg:w-24 xl:w-28 2xl:w-32 rounded-lg lg:rounded-md xl:rounded-lg'
              onClick={handleCloseWindow}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Windows;
