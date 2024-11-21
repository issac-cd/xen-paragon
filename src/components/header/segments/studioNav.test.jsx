import React from 'react';
import { render } from '@testing-library/react';
import StudioNav from './StudioNav';
import { getSiteConfig, getActiveTabForStudioNav } from '../../../utils';

// Mock dependencies
jest.mock('../../../utils', () => ({
  getSiteConfig: jest.fn(),
  getActiveTabForStudioNav: jest.fn(),
}));

jest.mock('../../../assets/index.js', () => ({
  homeIcon: jest.fn().mockResolvedValue(''),
  hamburgerWhiteIcon: jest.fn().mockResolvedValue(''),
  hamburgerMenu: jest.fn().mockResolvedValue(''),
  settingIcon: jest.fn().mockResolvedValue(''),
  closeIconWhite: jest.fn().mockResolvedValue(''),
  closeIcon: jest.fn().mockResolvedValue(''),
  addIcon: jest.fn().mockResolvedValue(''),
}));

describe('StudioNaV', () => {
  it('renders the correct nav items', () => {
    // Mock getSiteConfig and getActiveTabForStudioNav
    getSiteConfig.mockReturnValueOnce('https://example.com');
    getActiveTabForStudioNav.mockReturnValueOnce('Edit');
    
    const { getAllByText } = render(<StudioNav courseId="123" />);
    
    // Check if the 'Edit' nav item is rendered as active
    expect(getAllByText('Edit')[0]).toHaveClass('active');
  });

  it('renders the mobile navigation when toggled', () => {
    // Mock the initial nav state
    getSiteConfig.mockReturnValueOnce('https://example.com');
    getActiveTabForStudioNav.mockReturnValueOnce('Edit');

    const { getByRole, getAllByText } = render(<StudioNav courseId="123" />);
    
    // Click the mobile toggle button to show mobile nav
    const toggleButton = getByRole('button');
    toggleButton.click();
    
    // Check if the mobile nav appears
    expect(getAllByText('Edit')[0]).toBeInTheDocument();
    expect(getAllByText('Files')[0]).toBeInTheDocument();
  });
});
