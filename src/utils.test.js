// utils.test.js
import { getSiteConfig, getActiveTabForStudioNav, getActiveTabForCourseNav } from './utils';
import { getConfig } from '@edx/frontend-platform';

// Mock the getConfig function
jest.mock('@edx/frontend-platform', () => ({
  getConfig: jest.fn().mockReturnValue({
    login_text: 'Login',
    SHOW_PUBLIC_SITE: 'true',
    dashboard_text: 'My Courses',
    HELP_TEXT: 'Help'
  }),
}));

describe('Utility Functions', () => {
  // Test the getSiteConfig function
  describe('getSiteConfig', () => {
    beforeEach(() => {
      // Reset mock for each test
      getConfig.mockReset();
    });

    it('should return value from config if key exists', () => {
      const result = getSiteConfig('login_text');
      expect(result).toBe('Login');
    });

    it('should return boolean values correctly for "true" strings', () => {
      const resultTrue = getSiteConfig('SHOW_PUBLIC_SITE');
      expect(resultTrue).toBe(true);
    });

    it('should return default value if key does not exist in config', () => {
      // When key does not exist in config, check if default value is returned
      const result = getSiteConfig('non_existing_key', 'default_value');
      expect(result).toBe('default_value');
    });

    it('should return default value for specific keys', () => {
      expect(getSiteConfig('login_text')).toBe('Login');
      expect(getSiteConfig('dashboard_text')).toBe('My Courses');
      expect(getSiteConfig('HELP_TEXT')).toBe('Help');
    });

    it('should return null for unknown keys without default value', () => {
      const result = getSiteConfig('unknown_key');
      expect(result).toBeNull();
    });
  });

  // Test the getActiveTabForStudioNav function
  describe('getActiveTabForStudioNav', () => {
    it('should return correct tab for studio paths', () => {
      expect(getActiveTabForStudioNav('/studio/assets')).toBe('Files');
      expect(getActiveTabForStudioNav('/studio/textbooks')).toBe('References');
      expect(getActiveTabForStudioNav('/studio/custom-pages')).toBe('Pages');
      expect(getActiveTabForStudioNav('/studio/course_info')).toBe('Updates');
      expect(getActiveTabForStudioNav('/studio/course_team')).toBe('Team');
      expect(getActiveTabForStudioNav('/studio/group_configurations')).toBe('Permissions');
      expect(getActiveTabForStudioNav('/studio/grading')).toBe('Grading');
      expect(getActiveTabForStudioNav('/studio/certificates')).toBe('Certificates');
      expect(getActiveTabForStudioNav('/studio/details')).toBe('Schedule & Details');
      expect(getActiveTabForStudioNav('/studio/import')).toBe('Import');
      expect(getActiveTabForStudioNav('/studio/export')).toBe('Export');
      expect(getActiveTabForStudioNav('/studio/checklists')).toBe('Checklists');
    });

    it('should return "Edit" for course-authoring/course path', () => {
      expect(getActiveTabForStudioNav('/studio/course-authoring/course')).toBe('Edit');
    });

    it('should return empty string for unknown path', () => {
      expect(getActiveTabForStudioNav('/studio/unknown')).toBe('');
    });
  });

  // Test the getActiveTabForCourseNav function
  describe('getActiveTabForCourseNav', () => {
    it('should return "dashboard" for learner-dashboard path', () => {
      expect(getActiveTabForCourseNav('/learner-dashboard')).toBe('dashboard');
    });

    it('should return "dashboard" for any other path', () => {
      expect(getActiveTabForCourseNav('/other-path')).toBe('dashboard');
    });
  });
});
