import React, { useState, useContext } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { getActiveTabForCourseNav, getSiteConfig } from '../../../utils';
import messages from '../messages';
import { closeIconWhite, hamburgerMenu } from '../../../assets';


const CourseNavItem = ({ navItem }) => <li
    className={`h-100 d-flex align-items-center py-2 py-lg-0 px-3 nav-item ${navItem.active ? 'active' : ''}` + navItem.classes}
  >
    <a href={navItem.url}>{navItem.name}</a>
</li>;

const CourseNav = () => {
  const { authenticatedUser } = useContext(AppContext);
  const { formatMessage } = useIntl();

  const activeTab = getActiveTabForCourseNav(window.location.pathname);

  const [showNav, setShowNav] = useState(false);
  const navBarLeft = [
    {
      name: getSiteConfig('dashboard_text') || formatMessage(messages.courses),
      url: `${getSiteConfig('LMS_BASE_URL')}/dashboard`,
      classes: `${activeTab === 'dashboard' ? 'active' : ''}`
    },
    { 
      name: getSiteConfig('TEXTBOOK_PLURAL_NAME') || formatMessage(messages.textbooks),
      url: '/xened/resource_library/',
      classes: `${getSiteConfig('ENABLE_RESOURCE_LIBRARY') ? '' : 'd-no'}`
    },
    { 
      name: getSiteConfig('LIBRARY_TEXT') || formatMessage(messages.libraries),
      url: `${getSiteConfig('STUDIO_BASE_URL')}/home_library`,
      classes: ''
    },
    { name: getSiteConfig('ADMIN_LINK_TEXT'), url: '/xened/manage/users', classes: '' }
  ];

  const navBarRight = [
    { 
      name: getSiteConfig('HELP_TEXT') || formatMessage(messages.help),
      url: getSiteConfig('help_text_link') || getSiteConfig('SUPPORT_URL'),
      classes: `${getSiteConfig('SHOW_HELP') ? '' : 'd-no'}`
    },
    { 
      name: getSiteConfig('profile_text') || formatMessage(messages.profile),
      url: `${getSiteConfig('ACCOUNT_PROFILE_URL')}/u/${authenticatedUser?.username}`,
      classes: `${getSiteConfig('SHOW_PROFILE') ? '' : 'd-no'}`
    },
    { 
      name: getSiteConfig('logout_text') || formatMessage(messages.logout),
      url: getSiteConfig('LOGOUT_URL'),
      classes: ''
    },
  ];

  const noAuthNav = [
    { 
      name: getSiteConfig('login_text') || formatMessage(messages.signIn),
      url: getSiteConfig('LOGIN_URL'),
      classes: ''
    },
    { 
      name: getSiteConfig('SIGNIN_TEXT') || formatMessage(messages.register),
      url: `${getSiteConfig('LMS_BASE_URL')}/register`,
      classes: `${getSiteConfig('ENABLE_SELF_REGISTER') ? '' : 'd-no'}`
    },
  ]

  const mobileNav = [
    {
      name: getSiteConfig('dashboard_text') || formatMessage(messages.courses),
      url: `${getSiteConfig('LMS_BASE_URL')}/dashboard`,
      classes: '',
      active: activeTab === 'dashboard'
    },
    { 
      name: getSiteConfig('TEXTBOOK_PLURAL_NAME') || formatMessage(messages.textbooks),
      url: '/xened/resource_library/',
      classes: `${getSiteConfig('ENABLE_RESOURCE_LIBRARY') ? '' : 'd-no'}`
    },
    {
      name: getSiteConfig('LIBRARY_TEXT') || formatMessage(messages.libraries),
      url: `${getSiteConfig('STUDIO_BASE_URL')}/home_library`,
      classes: ''
    },
    { name: 'Studio', url: getSiteConfig('STUDIO_BASE_URL'), classes: 'd-no' },
    { name: getSiteConfig('ADMIN_LINK_TEXT'), url: '/xened/manage/users', classes: '' },
    { 
      name: getSiteConfig('HELP_TEXT') || formatMessage(messages.help),
      url: getSiteConfig('help_text_link') || getSiteConfig('SUPPORT_URL'),
      classes: `${getSiteConfig('SHOW_HELP') ? '' : 'd-no'}`
    },
    { 
      name: getSiteConfig('profile_text') || formatMessage(messages.profile),
      url: `profile/u/${authenticatedUser?.username}`,
      classes: `${getSiteConfig('SHOW_PROFILE') ? '' : 'd-no'}`
    },
    {
      name: getSiteConfig('logout_text') || formatMessage(messages.logout),
      url: getSiteConfig('LOGOUT_URL'),
      classes: ''
    },
  ];
  
  return (
    <div className="d-flex w-100 nav-bar">
      <div className="mx-auto w-100 d-flex">
        <nav className="navbar navbar-light navbar-expand-lg w-100 p-0 m-0 d-md-block d-none">								
          <ul className="d-flex header-authenticated w-100 pl-0 mb-0">
            <div className="d-flex justify-content-start w-50 h-100">
              {authenticatedUser && navBarLeft.map((navItem, index) => <CourseNavItem key={`course-nav-left-${index}`} navItem={navItem} />)}
            </div>
            <div className="d-flex justify-content-end w-50 h-100 navbar-right">
              {(authenticatedUser ? navBarRight : noAuthNav).map((navItem, index) => (
                <CourseNavItem key={`course-nav-right-${index}`} navItem={navItem} />)
              )}
            </div>
          </ul>
        </nav>
        
        <nav className="navbar pb-0 navbar-expand-md p-0 mx-md-3 mx-lg-5 pt-md-4 mb-md-4 d-md-none d-block w-100">

          {authenticatedUser ? <div className="d-flex d-md-none align-items-center justify-content-between w-100">
            <p className="nav-item active m-0">
              {mobileNav.filter(x => x.active).map(navItem => (
                <a className="help-menu-item" href={navItem.url} key='mobile-nav-active-item'>
                  {navItem.name}
                </a>
              ))}

            </p>
            <button className="navbar-toggler pr-xl-4 pr-lg-3 pr-md-2 pr-0 d-flex d-lg-none" type="button" onClick={() => setShowNav(!showNav)}>
              <div className="menu-toggle-icon d-xl-none" style={{ backgroundImage: `url(${showNav ? closeIconWhite : hamburgerMenu})` }}></div>
            </button>
          </div> :
          <div className='d-flex d-md-none align-items-center justify-content-end w-100'>
            {noAuthNav.map((navItem, index) => <p className="m-0 nav-item" key={`noauth-nav-${index}`}>
              <a href={navItem.url} className={navItem.classes}>{navItem.name}</a>
            </p>)}
          </div>}

          <div className={`navbar-collapse position-relative m-lg-0 collapse ${showNav ? 'show' : ''}`}>
            <ol className="tabs course-tabs navbar-nav p-0">
              {mobileNav.filter(x => !x.active).map((navItem, index) => (<li
                key={`course-nav-mobile-${index}`}
                className={'tab ' + navItem.classes}
              >
                <a href={navItem.url}>{navItem.name}</a>
              </li>))}
            </ol>
          </div>
        </nav>

      </div>
    </div>
  )
};

export default CourseNav;
