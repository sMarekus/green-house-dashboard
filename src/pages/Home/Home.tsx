import React from 'react';

interface HomeProps {
    
}

const Home: React.FC<HomeProps> = () => {
    return (
        <div className='pt-[100px] px-5 lg:pl-[272px] xl:pl-[344px] lg:pr-4 xl:pr-6'>
            <h1 className='font-pt_sans_arrow text-secondary 2xl:text-5xl'>Welcome Back!</h1>

            <div className='flex justify-between 2xl:gap-x-10 2xl:pt-8'>
                <div className='w-1/3 h-40 bg-red-500'>

                </div>

                <div className='w-1/3 h-40 bg-red-500'>
                    
                </div>

                <div className='w-1/3 h-40 bg-red-500'>
                    
                </div>
            </div>
        </div>
    );
};

export default Home;
