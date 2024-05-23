// src/components/Header/__tests__/Header.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Header from '../Header';

// Mock the SVG imports
jest.mock('../../../assets/icons/hamburger.svg', () => 'hamburger.svg');
jest.mock('../../../assets/icons/x-mark.svg', () => 'x-mark.svg');

describe('Header Component', () => {
  const mockToggleSidebar = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Header component with closed sidebar', () => {
    render(<Header toggleSidebar={mockToggleSidebar} isSidebarOpen={false} />);

    const button = screen.getByRole('button');
    const img = screen.getByTestId('hamburger-icon');

    expect(button).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });

  test('renders Header component with opened sidebar', () => {
    render(<Header toggleSidebar={mockToggleSidebar} isSidebarOpen={true} />);

    const button = screen.getByRole('button');
    const img = screen.getByTestId('x-mark-icon');

    expect(button).toBeInTheDocument();
    expect(img).toBeInTheDocument();
  });

  test('calls toggleSidebar when button is clicked', () => {
    render(<Header toggleSidebar={mockToggleSidebar} isSidebarOpen={false} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockToggleSidebar).toHaveBeenCalledTimes(1);
  });
});
