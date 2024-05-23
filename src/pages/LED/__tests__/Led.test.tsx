// src\pages\LED\__tests__\Led.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Led from '../Led';
import { BoardService } from '../../../api/Services/BoardService';
import { BrowserRouter } from 'react-router-dom';

jest.mock('../../../api/Services/BoardService');

describe('Led Component', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  test('renders LED component and fetches initial statuses', async () => {
    (BoardService.getStatuses as jest.Mock).mockResolvedValue({ windowStatus: 1, ledStatus: 0 });

    render(
      <BrowserRouter>
        <Led />
      </BrowserRouter>
    );

    expect(screen.getByTestId('led-status')).toHaveTextContent('Loading...');

    await waitFor(() => {
      expect(BoardService.getStatuses).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.getByTestId('led-status')).toHaveTextContent('LED is OFF');
    });
  });

  test('turns LED on', async () => {
    (BoardService.getStatuses as jest.Mock).mockResolvedValue({ windowStatus: 1, ledStatus: 0 });
    (BoardService.updateStatus as jest.Mock).mockResolvedValue({});

    render(
      <BrowserRouter>
        <Led />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('led-status')).toHaveTextContent('LED is OFF');
    });

    const onButton = screen.getByTestId('led-on-button');
    fireEvent.click(onButton);

    await waitFor(() => {
      expect(BoardService.updateStatus).toHaveBeenCalledWith(1, 1);
    });

    await waitFor(() => {
      expect(screen.getByTestId('led-status')).toHaveTextContent('LED is ON');
    });
  });

  test('turns LED off', async () => {
    (BoardService.getStatuses as jest.Mock).mockResolvedValue({ windowStatus: 1, ledStatus: 1 });
    (BoardService.updateStatus as jest.Mock).mockResolvedValue({});

    render(
      <BrowserRouter>
        <Led />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('led-status')).toHaveTextContent('LED is ON');
    });

    const offButton = screen.getByTestId('led-off-button');
    fireEvent.click(offButton);

    await waitFor(() => {
      expect(BoardService.updateStatus).toHaveBeenCalledWith(1, 0);
    });

    await waitFor(() => {
      expect(screen.getByTestId('led-status')).toHaveTextContent('LED is OFF');
    });
  });

  test('handles errors while fetching statuses', async () => {
    (BoardService.getStatuses as jest.Mock).mockRejectedValue(new Error('Failed to fetch statuses'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    render(
      <BrowserRouter>
        <Led />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(BoardService.getStatuses).toHaveBeenCalledTimes(1);
    });

    expect(consoleSpy).toHaveBeenCalledWith('Failed to fetch statuses');

    consoleSpy.mockRestore();
  });

  test('handles errors while updating statuses', async () => {
    (BoardService.getStatuses as jest.Mock).mockResolvedValue({ windowStatus: 1, ledStatus: 0 });
    (BoardService.updateStatus as jest.Mock).mockRejectedValue(new Error('Failed to update window status'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    render(
      <BrowserRouter>
        <Led />
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId('led-status')).toHaveTextContent('LED is OFF');
    });

    const onButton = screen.getByTestId('led-on-button');
    fireEvent.click(onButton);

    await waitFor(() => {
      expect(BoardService.updateStatus).toHaveBeenCalledWith(1, 1);
    });

    expect(consoleSpy).toHaveBeenCalledWith('Failed to update window status');

    consoleSpy.mockRestore();
  });
});
