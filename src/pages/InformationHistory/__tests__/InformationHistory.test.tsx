import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import InformationHistory from '../InformationHistory';
import { MeasurementService } from '../../../api/Services/MeasurementService';

// Mock the MeasurementService
jest.mock('../../../api/Services/MeasurementService');

const mockMeasurements = [
  { id: '1', value: 100, type: 'Light', time: '2023-01-01T10:00:00Z' },
  { id: '2', value: 23, type: 'Temperature', time: '2023-01-01T10:05:00Z' },
  { id: '3', value: 45, type: 'Humidity', time: '2023-01-01T10:10:00Z' },
];

describe('InformationHistory Component', () => {
  beforeEach(() => {
    jest.spyOn(MeasurementService, 'getMeasurements').mockResolvedValue(mockMeasurements);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders InformationHistory component', async () => {
    render(
      <BrowserRouter>
        <InformationHistory />
      </BrowserRouter>
    );

    expect(screen.getByText('Information History')).toBeInTheDocument();
  });

  test('displays no measurements found when there is no data', async () => {
    jest.spyOn(MeasurementService, 'getMeasurements').mockResolvedValueOnce([]);

    render(
      <BrowserRouter>
        <InformationHistory />
      </BrowserRouter>
    );

    expect(await screen.findByText('No measurements found.')).toBeInTheDocument();
  });

  test('renders data table with measurements', async () => {
    render(
      <BrowserRouter>
        <InformationHistory />
      </BrowserRouter>
    );

    expect(await screen.findByText('Light')).toBeInTheDocument();
    expect(await screen.findByText('Temperature')).toBeInTheDocument();
    expect(await screen.findByText('Humidity')).toBeInTheDocument();
  });

  test('filters measurements using the global filter', async () => {
    render(
      <BrowserRouter>
        <InformationHistory />
      </BrowserRouter>
    );

    const searchInput = screen.getByPlaceholderText('Keyword Search');
    fireEvent.change(searchInput, { target: { value: 'Light' } });

    expect(await screen.findByText('Light')).toBeInTheDocument();
    expect(screen.queryByText('Temperature')).not.toBeInTheDocument();
    expect(screen.queryByText('Humidity')).not.toBeInTheDocument();
  });

  test('handles API errors gracefully', async () => {
    jest.spyOn(MeasurementService, 'getMeasurements').mockRejectedValue(new Error('API Error'));

    render(
      <BrowserRouter>
        <InformationHistory />
      </BrowserRouter>
    );

    expect(await screen.findByText('No measurements found.')).toBeInTheDocument();
  });
});
