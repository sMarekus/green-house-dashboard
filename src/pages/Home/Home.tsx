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
        </div>
    );
};

export default Home;
