import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Home';
import { BoardService } from '../../../api/Services/BoardService';
import { MeasurementService } from '../../../api/Services/MeasurementService';
import { NotificationService } from '../../../api/Services/NotificationService';

jest.mock('../../../api/Services/BoardService');
jest.mock('../../../api/Services/MeasurementService');
jest.mock('../../../api/Services/NotificationService');

const mockStatuses = {
  ledStatus: 1,
  windowStatus: 0
};

const mockLightingMeasurement = 1500;
const mockHumidityMeasurement = 45;
const mockHeatingMeasurement = 22;
const mockNotifications = [
  { threshold: 50, measurementType: 'Humidity', message: 'Humidity threshold exceeded' },
  { threshold: 2000, measurementType: 'Light', message: 'Lighting threshold exceeded' }
];

describe('Home Component', () => {
  beforeEach(() => {
    jest.spyOn(BoardService, 'getStatuses').mockResolvedValue(mockStatuses);
    jest.spyOn(MeasurementService, 'getLatestLightingMeasurement').mockResolvedValue(mockLightingMeasurement);
    jest.spyOn(MeasurementService, 'getLatestHumidityMeasurement').mockResolvedValue(mockHumidityMeasurement);
    jest.spyOn(MeasurementService, 'getLatestTemperatureMeasurement').mockResolvedValue(mockHeatingMeasurement);
    jest.spyOn(NotificationService, 'getNotifications').mockResolvedValue(mockNotifications);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Home component and displays skeletons initially', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(screen.getByText('Welcome Back!')).toBeInTheDocument();
    expect(screen.getByText('Lighting')).toBeInTheDocument();
    expect(screen.getByText('LED')).toBeInTheDocument();
    expect(screen.getByText('Window')).toBeInTheDocument();
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('Heating')).toBeInTheDocument();
    expect(screen.getAllByTestId('skeleton-element').length).toBe(5); // 5 skeletons
  });

  test('fetches and displays lighting data correctly', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(await screen.findByText('1500 lx')).toBeInTheDocument();
  });

  test('fetches and displays LED data correctly', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(await screen.findByText('ON')).toBeInTheDocument();
  });

  test('fetches and displays window status correctly', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(await screen.findByText('CLOSED')).toBeInTheDocument();
  });

  test('fetches and displays humidity data correctly', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(await screen.findByText('45%')).toBeInTheDocument();
  });

  test('fetches and displays heating data correctly', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(await screen.findByText('22°C')).toBeInTheDocument();
  });

  test('displays notifications correctly', async () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(await screen.findByText('Notifications')).toBeInTheDocument();
    expect(await screen.findByText('Humidity threshold exceeded')).toBeInTheDocument();
    expect(await screen.findByText('Lighting threshold exceeded')).toBeInTheDocument();
  });

  test('handles API errors gracefully', async () => {
    jest.spyOn(BoardService, 'getStatuses').mockRejectedValue(new Error('Failed to fetch statuses'));
    jest.spyOn(MeasurementService, 'getLatestLightingMeasurement').mockRejectedValue(new Error('Failed to fetch lighting measurement'));
    jest.spyOn(MeasurementService, 'getLatestHumidityMeasurement').mockRejectedValue(new Error('Failed to fetch humidity measurement'));
    jest.spyOn(MeasurementService, 'getLatestTemperatureMeasurement').mockRejectedValue(new Error('Failed to fetch temperature measurement'));
    jest.spyOn(NotificationService, 'getNotifications').mockRejectedValue(new Error('Failed to fetch notifications'));

    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    expect(await screen.findAllByTestId('skeleton-element')).toHaveLength(5);
  });
});
