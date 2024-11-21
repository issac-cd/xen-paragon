// Header.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Header from '.';
import { getSiteConfig } from '../../utils';
import { IntlProvider } from 'react-intl';
import { AppContext } from '@edx/frontend-platform/react';

// Mock components
jest.mock('./segments/TopBar', () => () => <div data-testid="top-bar">TopBar</div>);
jest.mock('./segments/CourseNav', () => () => <div data-testid="course-nav">CourseNav</div>);
jest.mock('../../assets', () => ({
  addIcon: 'path-to-add-icon-image',
}));

// Mock getSiteConfig function
jest.mock('../../utils', () => ({
  getSiteConfig: jest.fn(),
}));

const mockAuthenticatedUser = { username: 'testuser', userId: 4 };

describe('Header', () => {

  beforeEach(() => {
    // Reset mock implementations before each test
    getSiteConfig.mockReset();
  });

  it('should render CourseNav and TopBar based on getSiteConfig values', () => {
    // Test when SHOW_PUBLIC_SITE is true
    getSiteConfig.mockReturnValueOnce(true);  // SHOW_PUBLIC_SITE

    render(<AppContext.Provider value={{ authenticatedUser: mockAuthenticatedUser }}>
      <IntlProvider locale='en'>
        <Header />
      </IntlProvider>
    </AppContext.Provider>);

    // Check if CourseNav is rendered
    expect(screen.getByTestId('course-nav')).toBeInTheDocument();

    // Check if TopBar is rendered (because SHOW_PUBLIC_SITE is true)
    expect(screen.getByTestId('top-bar')).toBeInTheDocument();
  });

  it('should not render TopBar when SHOW_PUBLIC_SITE is false', () => {
    // Test when SHOW_PUBLIC_SITE is false
    getSiteConfig.mockReturnValueOnce(false);  // SHOW_PUBLIC_SITE

    render(<AppContext.Provider value={{ authenticatedUser: mockAuthenticatedUser }}>
      <IntlProvider locale='en'>
        <Header />
      </IntlProvider>
    </AppContext.Provider>);

    // Check if CourseNav is rendered
    expect(screen.getByTestId('course-nav')).toBeInTheDocument();

    // Check if TopBar is not rendered (because SHOW_PUBLIC_SITE is false)
    expect(screen.queryByTestId('top-bar')).not.toBeInTheDocument();
  });

  it('should render the Create Space icon', () => {
    // Test rendering of the Create Space icon image
    render(<AppContext.Provider value={{ authenticatedUser: mockAuthenticatedUser }}>
      <IntlProvider locale='en'>
        <Header />
      </IntlProvider>
    </AppContext.Provider>);

    expect(screen.getByText('Create Space')).toBeInTheDocument();
  });
});
