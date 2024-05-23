import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Lighting from '../Lighting';
import { MeasurementService } from '../../../api/Services/MeasurementService';
import { NotificationService } from '../../../api/Services/NotificationService';

// Mocking the services
jest.mock('../../../api/Services/MeasurementService');
jest.mock('../../../api/Services/NotificationService');

describe('Lighting Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.spyOn(console, 'error').mockImplementation(() => {});
        jest.spyOn(console, 'log').mockImplementation(() => {});
    });

    test('renders Lighting component correctly', async () => {
        (MeasurementService.getLatestLightingMeasurement as jest.Mock).mockResolvedValue(300);

        render(<Lighting />);

        expect(screen.getByTestId('lighting-title')).toBeInTheDocument();

        await waitFor(() => {
            expect(screen.getByText('300 lx')).toBeInTheDocument();
        });
    });

    test('handles set notification threshold', async () => {
        (MeasurementService.getLatestLightingMeasurement as jest.Mock).mockResolvedValue(300);
        (NotificationService.setLightingNotification as jest.Mock).mockResolvedValue(true);

        render(<Lighting />);

        fireEvent.click(screen.getByTestId('open-threshold-modal-button'));

        const input = screen.getByPlaceholderText('Set Maximum Lighting Level');
        fireEvent.change(input, { target: { value: '500' } });

        fireEvent.click(screen.getByTestId('confirm-threshold-button'));

        await waitFor(() => {
            expect(NotificationService.setLightingNotification).toHaveBeenCalledWith(500);
        });

        expect(console.log).toHaveBeenCalledWith('Successfully set lighting notification threshold.');
    });

    test('displays error message on fetch failure', async () => {
        (MeasurementService.getLatestLightingMeasurement as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

        render(<Lighting />);

        await waitFor(() => {
            expect(screen.queryByText('300 lx')).not.toBeInTheDocument();
        });

        expect(console.error).toHaveBeenCalledWith('Failed to fetch latest light:', expect.any(Error));
    });

    test('displays error message on notification set failure', async () => {
        (MeasurementService.getLatestLightingMeasurement as jest.Mock).mockResolvedValue(300);
        (NotificationService.setLightingNotification as jest.Mock).mockRejectedValue(new Error('Failed to set'));

        render(<Lighting />);

        fireEvent.click(screen.getByTestId('open-threshold-modal-button'));

        const input = screen.getByPlaceholderText('Set Maximum Lighting Level');
        fireEvent.change(input, { target: { value: '500' } });

        fireEvent.click(screen.getByTestId('confirm-threshold-button'));

        await waitFor(() => {
            expect(NotificationService.setLightingNotification).toHaveBeenCalledWith(500);
        });

        expect(console.error).toHaveBeenCalledWith('Failed to set lighting notification:', expect.any(Error));
    });
});
