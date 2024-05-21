import React from 'react';
import './Home.sass'

interface HomeProps {
    
}

const Home: React.FC<HomeProps> = () => {
    return (
        <div className='pt-[100px] px-5 lg:pl-[272px] xl:pl-[344px] lg:pr-4 xl:pr-6'>
            <h1 className='font-pt_sans_arrow text-secondary text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl'>Welcome Back!</h1>

            <div className='flex flex-col md:flex-row justify-between gap-y-8 md:gap-y-0 md:gap-x-4 lg:gap-x-5 xl:gap-x-6 2xl:gap-x-10 pt-3 md:pt-4 lg:pt-5 xl:pt-6 2xl:pt-8'>
                <div className='box'>
                    <h4>Lighting</h4>
                    <span>99</span>
                </div>

                <div className='box'>
                    <h4>Humidity</h4>
                    <span>99</span>
                </div>

                <div className='box'>
                    <h4>Heating</h4>
                    <span>99</span>
                </div>
            </div>

            <div className='flex flex-col pt-10'>
                <div className='flex 2xl:gap-x-2'>
                    <h1 className='font-pt_sans_arrow text-secondary text-3xl md:text-3xl xl:text-4xl 2xl:text-5xl'>Notifications</h1>
                    <div className='bg-primary 2xl:w-8 2xl:h-8 rounded-full flex items-center justify-center font-pt_sans_arrow text-white font-semibold'>
                        5
                    </div>
                </div>

                <div className='notifications flex flex-col pt-4'>
                    <div className='w-full p-4 bg-[#FDFDFD] border-[#DEDEDE] border rounded-lg'>
                        <h1>Heating</h1>
                        <p>Custom message</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
