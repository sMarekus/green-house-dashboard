import React, { useState } from 'react';
import HeatingIcon from '../../components/Icons/Sun';
import { Button } from 'primereact/button';
import ThresholdButton from '../../components/ThresholdButton';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';

interface HeatingProps {}

const Heating: React.FC<HeatingProps> = () => {
    const [visible, setVisible] = useState(false);
    const FooterContent = (
        <div className="flex justify-end space-x-2">
            <Button label="Set Notification Threshold" className="bg-primary font-pt_sans" />
            <Button label="Cancel" className="p-button-warning font-pt_sans" onClick={() => setVisible(false)} autoFocus />
        </div>
    );

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="font-pt_sans_arrow text-secondary text-3xl md:text-4xl xl:text-5xl mb-8">Heating</h1>
            <div className="mb-5">
                <HeatingIcon className="w-52 h-52" color="#BBBB" />
            </div>
            <div className="flex justify-center mb-28 font-pt_sans_arrow text-secondary text-3xl md:text-4xl xl:text-5xl">
                <p>25 °C</p>
            </div>
            <div className="w-full md:w-80 px-4 md:px-0">
                <ThresholdButton label="Set Notification Threshold" onClick={() => setVisible(true)} />
                <Dialog
                    visible={visible}
                    footer={FooterContent}
                    onHide={() => setVisible(false)}
                    className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                >
                    <div className="p-4">
                        <InputText
                            className="w-full px-4 focus:shadow-none font-pt_sans"
                            placeholder="Set Maximum Heating Level"
                        />
                    </div>
                </Dialog>
            </div>
        </div>
    );
};

export default Heating;
