import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import Sidebar from '../Sidebar';

jest.mock('../../../assets/logo/logo.svg', () => 'logo.svg');

describe('Sidebar Component', () => {
  const mockToggleSidebar = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  const renderSidebar = (isOpen: boolean) => {
    return render(
      <BrowserRouter>
        <Sidebar isOpen={isOpen} toggleSidebar={mockToggleSidebar} />
      </BrowserRouter>
    );
  };

  test('renders Sidebar component with closed state', () => {
    renderSidebar(false);

    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Utilities')).toBeInTheDocument();
  });

  test('renders Sidebar component with open state', () => {
    renderSidebar(true);

    expect(screen.getByAltText('Logo')).toBeInTheDocument();
    expect(screen.getByText('Menu')).toBeInTheDocument();
    expect(screen.getByText('Utilities')).toBeInTheDocument();
  });

  test('renders all menu items', () => {
    renderSidebar(true);

    const menuItems = ['Home', 'Information History', 'Lighting', 'Heating', 'Humidity', 'Windows', 'LED'];

    menuItems.forEach(item => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });

  test('clicking menu items changes active item and navigates', () => {
    renderSidebar(true);

    const homeButton = screen.getByRole('button', { name: 'Home' });
    const lightingButton = screen.getByRole('button', { name: 'Lighting' });

    fireEvent.click(lightingButton);
    expect(lightingButton).toHaveClass('active');

    fireEvent.click(homeButton);
    expect(homeButton).toHaveClass('active');
  });
});
