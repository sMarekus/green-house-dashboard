// src/pages/Heating/__tests__/Heating.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Heating from '../Heating';
import { MeasurementService } from '../../../api/Services/MeasurementService';
import { NotificationService } from '../../../api/Services/NotificationService';

// Mocking the services
jest.mock('../../../api/Services/MeasurementService');
jest.mock('../../../api/Services/NotificationService');

describe('Heating Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders Heating component correctly', async () => {
        (MeasurementService.getLatestTemperatureMeasurement as jest.Mock).mockResolvedValue(25);

        await act(async () => {
            render(<Heating />);
        });

        expect(screen.getByTestId('heating-title')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('25 °C')).toBeInTheDocument();
        });
    });

    test('handles set notification threshold', async () => {
        (MeasurementService.getLatestTemperatureMeasurement as jest.Mock).mockResolvedValue(25);
        (NotificationService.setHeatingNotification as jest.Mock).mockResolvedValue(true);

        await act(async () => {
            render(<Heating />);
        });

        fireEvent.click(screen.getByTestId('open-threshold-modal-button'));

        const input = screen.getByTestId('threshold-input');
        fireEvent.change(input, { target: { value: '30' } });

        fireEvent.click(screen.getByTestId('confirm-threshold-button'));

        await waitFor(() => {
            expect(NotificationService.setHeatingNotification).toHaveBeenCalledWith(30);
        });
    });

    test('displays error message on fetch failure', async () => {
        (MeasurementService.getLatestTemperatureMeasurement as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

        await act(async () => {
            render(<Heating />);
        });

        await waitFor(() => {
            expect(screen.queryByText('25 °C')).not.toBeInTheDocument();
        });
    });

    test('displays error message on notification set failure', async () => {
        (MeasurementService.getLatestTemperatureMeasurement as jest.Mock).mockResolvedValue(25);
        (NotificationService.setHeatingNotification as jest.Mock).mockRejectedValue(new Error('Failed to set'));

        await act(async () => {
            render(<Heating />);
        });

        fireEvent.click(screen.getByTestId('open-threshold-modal-button'));

        const input = screen.getByTestId('threshold-input');
        fireEvent.change(input, { target: { value: '30' } });

        fireEvent.click(screen.getByTestId('confirm-threshold-button'));

        await waitFor(() => {
            expect(NotificationService.setHeatingNotification).toHaveBeenCalledWith(30);
        });
    });
});
