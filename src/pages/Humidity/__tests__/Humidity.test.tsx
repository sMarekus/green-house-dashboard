import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Humidity from '../Humidity';
import { MeasurementService } from '../../../api/Services/MeasurementService';
import { NotificationService } from '../../../api/Services/NotificationService';

// Mocking the services
jest.mock('../../../api/Services/MeasurementService');
jest.mock('../../../api/Services/NotificationService');

describe('Humidity Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    test('renders Humidity component correctly', async () => {
        (MeasurementService.getLatestHumidityMeasurement as jest.Mock).mockResolvedValue(45);

        render(<Humidity />);

        expect(screen.getByTestId('humidity-title')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('45 %')).toBeInTheDocument();
        });
    });

    test('handles set notification threshold', async () => {
        (MeasurementService.getLatestHumidityMeasurement as jest.Mock).mockResolvedValue(45);
        (NotificationService.setHumidityNotification as jest.Mock).mockResolvedValue(true);

        render(<Humidity />);

        fireEvent.click(screen.getByTestId('open-threshold-modal-button'));

        const input = screen.getByPlaceholderText('Set Maximum Humidity Percentage');
        fireEvent.change(input, { target: { value: '50' } });

        fireEvent.click(screen.getByTestId('confirm-threshold-button'));

        await waitFor(() => {
            expect(NotificationService.setHumidityNotification).toHaveBeenCalledWith(50);
        });

        expect(console.log).toHaveBeenCalledWith('Successfully set humidity notification threshold.');
    });

    test('displays error message on fetch failure', async () => {
        (MeasurementService.getLatestHumidityMeasurement as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

        render(<Humidity />);

        await waitFor(() => {
            expect(screen.queryByText('45 %')).not.toBeInTheDocument();
        });

        expect(console.error).toHaveBeenCalledWith('Failed to fetch latest humidity:', expect.any(Error));
    });

    test('displays error message on notification set failure', async () => {
        (MeasurementService.getLatestHumidityMeasurement as jest.Mock).mockResolvedValue(45);
        (NotificationService.setHumidityNotification as jest.Mock).mockRejectedValue(new Error('Failed to set'));

        render(<Humidity />);

        fireEvent.click(screen.getByTestId('open-threshold-modal-button'));

        const input = screen.getByPlaceholderText('Set Maximum Humidity Percentage');
        fireEvent.change(input, { target: { value: '50' } });

        fireEvent.click(screen.getByTestId('confirm-threshold-button'));

        await waitFor(() => {
            expect(NotificationService.setHumidityNotification).toHaveBeenCalledWith(50);
        });

        expect(console.error).toHaveBeenCalledWith('Failed to set humidity notification:', expect.any(Error));
    });
});
