// StudioHeader.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import StudioHeader from '.';
import { getSiteConfig } from '../../../utils';

// Mock components
jest.mock('../segments/TopBar', () => () => <div data-testid="top-bar">TopBar</div>);
jest.mock('../segments/StudioNav', () => () => <div data-testid="studio-nav">StudioNaV</div>);
jest.mock('../segments/CourseNav', () => () => <div data-testid="course-nav">CourseNav</div>);
jest.mock('../segments/CourseBar', () => () => <div data-testid="course-bar">CourseBar</div>);

// Mock getSiteConfig function
jest.mock('../../../utils', () => ({
  getSiteConfig: jest.fn(),
}));

// Test data
const courseId = '12345';
const courseTitle = 'React for Beginners';

describe('StudioHeader', () => {

  beforeEach(() => {
    // Reset mock implementations before each test
    getSiteConfig.mockReset();
  });

  it('should render CourseNav and conditional components based on getSiteConfig values', () => {
    // Test when SHOW_PUBLIC_SITE is true and ENABLE_CUSTOM_HEADER is false
    getSiteConfig.mockReturnValueOnce(true);  // SHOW_PUBLIC_SITE
    getSiteConfig.mockReturnValueOnce(false); // ENABLE_CUSTOM_HEADER

    render(<StudioHeader courseId={courseId} title={courseTitle} />);

    // Check if CourseNav is rendered
    expect(screen.getByTestId('course-nav')).toBeInTheDocument();

    // Check if TopBar is rendered (because SHOW_PUBLIC_SITE is true)
    expect(screen.getByTestId('top-bar')).toBeInTheDocument();

    // Check if CourseBar is rendered (because ENABLE_CUSTOM_HEADER is false)
    expect(screen.getByTestId('course-bar')).toBeInTheDocument();
    expect(screen.queryByTestId('studio-nav')).not.toBeInTheDocument(); // StudioNaV should not be rendered
  });

  it('should render StudioNaV when ENABLE_CUSTOM_HEADER is true', () => {
    // Test when SHOW_PUBLIC_SITE is false and ENABLE_CUSTOM_HEADER is true
    getSiteConfig.mockReturnValueOnce(false); // SHOW_PUBLIC_SITE
    getSiteConfig.mockReturnValueOnce(true);  // ENABLE_CUSTOM_HEADER

    render(<StudioHeader courseId={courseId} title={courseTitle} />);

    // Check if CourseNav is rendered
    expect(screen.getByTestId('course-nav')).toBeInTheDocument();

    // Check if TopBar is not rendered (because SHOW_PUBLIC_SITE is false)
    expect(screen.queryByTestId('top-bar')).not.toBeInTheDocument();

    // Check if StudioNaV is rendered (because ENABLE_CUSTOM_HEADER is true)
    expect(screen.getByTestId('studio-nav')).toBeInTheDocument();
    expect(screen.queryByTestId('course-bar')).not.toBeInTheDocument(); // CourseBar should not be rendered
  });

  it('should pass courseId prop to StudioNaV when ENABLE_CUSTOM_HEADER is true', () => {
    // Test when ENABLE_CUSTOM_HEADER is true
    getSiteConfig.mockReturnValueOnce(false); // SHOW_PUBLIC_SITE
    getSiteConfig.mockReturnValueOnce(true);  // ENABLE_CUSTOM_HEADER

    render(<StudioHeader courseId={courseId} title={courseTitle} />);

    // Check if StudioNaV receives the courseId prop correctly
    const studioNav = screen.getByTestId('studio-nav');
    expect(studioNav).toHaveTextContent('StudioNaV');
  });

  it('should pass courseId and courseTitle props to CourseBar when ENABLE_CUSTOM_HEADER is false', () => {
    // Test when ENABLE_CUSTOM_HEADER is false
    getSiteConfig.mockReturnValueOnce(true);  // SHOW_PUBLIC_SITE
    getSiteConfig.mockReturnValueOnce(false); // ENABLE_CUSTOM_HEADER

    render(<StudioHeader courseId={courseId} title={courseTitle} />);

    // Check if CourseBar receives the courseId and courseTitle props correctly
    const courseBar = screen.getByTestId('course-bar');
    expect(courseBar).toHaveTextContent('CourseBar');
  });
});
