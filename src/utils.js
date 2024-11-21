import { getConfig } from '@edx/frontend-platform';

const config = getConfig();

export const getSiteConfig = (key, overrideDefault = null) => {
  if (config[key]) {
    if (config[key] === 'true') return true;
    else if (config[key] === 'false') return false;
    else return config[key];
  }

  if (overrideDefault) { return overrideDefault; }

  switch (key) {
    // Add defaults here
    case 'login_text': return 'Login';
    case 'dashboard_text': return 'My Courses';
    case 'LIBRARY_TEXT': return 'Libraries';
    case 'ADMIN_LINK_TEXT': return 'Admin';
    case 'SHOW_HELP': return true;
    case 'HELP_TEXT': return 'Help';
    case 'help_text_link': return 'https://help.xen.education';
    case 'profile_text': return 'Profile';
    case 'SHOW_PUBLIC_SITE': return false;
    case 'org_official_site_help_text': return 'visit';
    case 'org_official_site_url_text': return 'our main site';
    case 'org_official_site_url': return 'https://help.xen.education';
    case 'logout_text': return 'Logout';
    case 'ENABLE_SELF_REGISTER': return false;
    case 'SIGNIN_TEXT': return 'Register';
    case 'SHOW_PROFILE': return true;
    case 'ENABLE_RESOURCE_LIBRARY': return true;
    case 'SIGNIN_TEXT': return 'Register';
    case 'enable_header_banner_img': return false;
    default: return null;
  }
};

// For Header
export const getActiveTabForStudioNav = (path) => {
  switch (path.split('/').pop()) {
    case 'assets': return 'Files';
    case 'textbooks': return 'References';
    case 'custom-pages': return 'Pages';
    case 'course_info': return 'Updates';
    case 'course_team': return 'Team';
    case 'group_configurations': return 'Permissions';
    case 'grading': return 'Grading';
    case 'certificates': return 'Certificates';
    case 'details': return 'Schedule & Details';
    case 'import': return 'Import';
    case 'export': return 'Export';
    case 'checklists': return 'Checklists';
    default:
      if (path.includes('course-authoring/course')) return 'Edit';
      else return '';
  }
};

export const getActiveTabForCourseNav = (path) => {
  switch (path.split('/').pop()) {
    case 'learner-dashboard': return 'dashboard';
    default:
      return 'dashboard';
  }
}
