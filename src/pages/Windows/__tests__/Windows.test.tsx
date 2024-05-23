import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Windows from '../Windows';
import { BoardService } from '../../../api/Services/BoardService';

jest.mock('../../../api/Services/BoardService');

const mockedBoardService = BoardService as jest.Mocked<typeof BoardService>;

describe('Windows Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders window status initially as loading', () => {
    render(<Windows />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('fetches and displays window status', async () => {
    mockedBoardService.getStatuses.mockResolvedValue({ windowStatus: 1, ledStatus: 1 });

    render(<Windows />);

    await waitFor(() => {
      expect(screen.getByText('Window is open')).toBeInTheDocument();
    });

    mockedBoardService.getStatuses.mockResolvedValue({ windowStatus: 0, ledStatus: 1 });

    render(<Windows />);

    await waitFor(() => {
      expect(screen.getByText('Window is closed')).toBeInTheDocument();
    });
  });

  test('opens the window when open button is clicked', async () => {
    mockedBoardService.getStatuses.mockResolvedValue({ windowStatus: 0, ledStatus: 1 });
    mockedBoardService.updateStatus.mockResolvedValue();

    render(<Windows />);

    await waitFor(() => {
      expect(screen.getByText('Window is closed')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Open'));

    await waitFor(() => {
      expect(screen.getByText('Window is open')).toBeInTheDocument();
    });

    expect(mockedBoardService.updateStatus).toHaveBeenCalledWith(1, 1);
  });

  test('closes the window when close button is clicked', async () => {
    mockedBoardService.getStatuses.mockResolvedValue({ windowStatus: 1, ledStatus: 1 });
    mockedBoardService.updateStatus.mockResolvedValue();

    render(<Windows />);

    await waitFor(() => {
      expect(screen.getByText('Window is open')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByText('Close'));

    await waitFor(() => {
      expect(screen.getByText('Window is closed')).toBeInTheDocument();
    });

    expect(mockedBoardService.updateStatus).toHaveBeenCalledWith(0, 1);
  });

  test('handles errors gracefully', async () => {
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    mockedBoardService.getStatuses.mockRejectedValue(new Error('Failed to fetch statuses'));

    render(<Windows />);

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument();
    });

    expect(consoleErrorSpy).toHaveBeenCalledWith('Failed to fetch statuses');

    consoleErrorSpy.mockRestore();
  });
});
