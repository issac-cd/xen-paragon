// TopBar.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TopBar from './TopBar';
import { getSiteConfig } from '../../../utils';

// Mock getSiteConfig function
jest.mock('../../../utils', () => ({
  getSiteConfig: jest.fn(),
}));

describe('TopBar', () => {
  
  beforeEach(() => {
    // Reset mock implementation before each test
    getSiteConfig.mockReset();
  });

  it('should render the correct org official site help text and URL', () => {
    // Mocking getSiteConfig return values
    getSiteConfig.mockReturnValueOnce('Need Help? Visit') // org_official_site_help_text
      .mockReturnValueOnce('https://www.example.com')
      .mockReturnValueOnce('https://www.example.com'); // org_official_site_url

    render(<TopBar />);

    // Check if the help text and link are rendered correctly
    expect(screen.getByText('Need Help? Visit')).toBeInTheDocument();
    
    expect(screen.getByText('https://www.example.com')).toHaveAttribute('href', 'https://www.example.com');
    expect(screen.getByText('https://www.example.com')).toHaveAttribute('target', '_blank');
  });

  it('should render the top bar with the correct structure', () => {
    // Mocking getSiteConfig return values for both
    getSiteConfig.mockReturnValueOnce('Need Help? Visit ') // org_official_site_help_text
      .mockReturnValueOnce('https://www.example.com'); // org_official_site_url

    render(<TopBar />);

    // Check if the structure is correct: logo, text, and link
    expect(screen.getByTestId('top-bar')).toBeInTheDocument();
    
    expect(screen.getByText('Need Help? Visit')).toBeInTheDocument();
  });

});
