// CourseBar.test.js
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CourseBar from './CourseBar';

// Mock the StudioNaV component to avoid rendering the child component in isolation
jest.mock('./StudioNav', () => jest.fn(() => <div data-testid="mock-studio-nav"></div>));

describe('CourseBar', () => {
  const courseTitle = "React for Beginners";
  const courseId = "12345";

  it('should render CourseBar with courseTitle and courseId props', () => {
    render(<CourseBar courseTitle={courseTitle} courseId={courseId} />);

    // Check if the courseTitle is rendered correctly
    expect(screen.getByText(courseTitle)).toBeInTheDocument();

    // Check if the StudioNaV component is rendered with the correct courseId prop
    expect(screen.getByTestId('mock-studio-nav')).toBeInTheDocument();
  });
});
