// CourseNav.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseNav from './CourseNav';
import { IntlProvider } from 'react-intl';
import { AppContext } from '@edx/frontend-platform/react';

// Mock utility functions
jest.mock('../../../utils', () => ({
  getActiveTabForCourseNav: jest.fn(() => 'dashboard'),
  getSiteConfig: jest.fn()
    .mockReturnValueOnce('Courses')
    .mockReturnValueOnce('Textbooks')
    .mockReturnValueOnce('Profile')
    .mockReturnValueOnce('Logout')
    .mockReturnValue('test-url'),
}));

// Mock assets
jest.mock('../../../assets', () => ({
  closeIconWhite: 'closeIconWhiteUrl',
  hamburgerMenu: 'hamburgerMenuUrl',
}));

jest.mock('./StudioNav', () => jest.fn(() => <div data-testid="mock-studio-nav"></div>));

// Mock context
const mockAuthenticatedUser = { username: 'testuser', userId: 4 };

describe('CourseNav', () => {

  it('renders navigation items correctly', () => {
    render(
      <AppContext.Provider value={{ authenticatedUser: mockAuthenticatedUser }}>
        <IntlProvider locale='en'>
          <CourseNav />
        </IntlProvider>
      </AppContext.Provider>
    );

    // Check if the left navigation items are rendered correctly
    expect(screen.getByText('Courses')).toBeInTheDocument();

    // Check if the right navigation items are rendered correctly
    expect(screen.getByText('Profile')).toBeInTheDocument();
  });

});
