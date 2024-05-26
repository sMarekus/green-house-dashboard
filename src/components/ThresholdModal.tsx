import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

interface ThresholdModalProps {
    visible: boolean;
    onHide: () => void;
    placeholder: string;
    onConfirm: (threshold: number) => void;
    'data-testid'?: string;
}

const ThresholdModal: React.FC<ThresholdModalProps> = ({ visible, onHide, placeholder, onConfirm, 'data-testid': dataTestId }) => {
    const [inputValue, setInputValue] = useState<string>('');

    const handleConfirm = () => {
        const threshold = parseFloat(inputValue);
        if (!isNaN(threshold)) {
            onConfirm(threshold);
        }
    };

    const FooterContent = (
        <div className="flex justify-end space-x-2">
            <Button label="Set Notification Threshold" className="bg-primary font-pt_sans" onClick={handleConfirm} data-testid="confirm-threshold-button" />
            <Button label="Cancel" className="p-button-warning font-pt_sans" onClick={onHide} autoFocus data-testid="cancel-threshold-button" />
        </div>
    );

    return (
        <Dialog
            visible={visible}
            footer={FooterContent}
            onHide={onHide}
            className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3"
            data-testid={dataTestId}
        >
            <div className="p-4">
                <InputText
                    className="w-full px-4 focus:shadow-none font-pt_sans"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    data-testid="threshold-input"
                />
            </div>
        </Dialog>
    );
};

export default ThresholdModal;
