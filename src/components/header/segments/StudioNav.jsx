import React, { useState } from 'react';
import { getActiveTabForStudioNav, getSiteConfig } from '../../../utils';

import { homeIcon, hamburgerWhiteIcon, settingIcon, closeIconWhite } from '../../../assets';



const StudioNav = ({ courseId }) => {

  const [showNav, setShowNav] = useState(false);

  const activeTab = getActiveTabForStudioNav(window.location.pathname);
  const STUDIO_URL = getSiteConfig('STUDIO_BASE_URL');

  const navItems = [
    { url: `${STUDIO_URL}/course/${courseId}`, name: 'Edit', part: 1 },
    { url: `${STUDIO_URL}/assets/${courseId}`, name: 'Files', part: 1 },
    { url: `${STUDIO_URL}/textbooks/${courseId}`, name: 'References', part: 1 },
    { url: `${STUDIO_URL}/tabs/${courseId}`, name: 'Pages', part: 1 },
    { url: `${STUDIO_URL}/course_info/${courseId}`, name: 'Updates', part: 1 },
    { url: `${STUDIO_URL}/course_team/${courseId}`, name: 'Team', part: 2 },
    { url: `${STUDIO_URL}/group_configurations/${courseId}`, name: 'Permissions', part: 2 },
    { url: `${STUDIO_URL}/settings/grading/${courseId}`, name: 'Grading', part: 2 },
    { url: `${STUDIO_URL}/certificates/${courseId}`, name: 'Certificates', part: 2 },
    { url: `${STUDIO_URL}/settings/details/${courseId}`, name: 'Schedule & Details', part: 3 },
    { url: `${STUDIO_URL}/import/${courseId}`, name: 'Import', part: 3 },
    { url: `${STUDIO_URL}/export/${courseId}`, name: 'Export', part: 3 },
    { url: `${STUDIO_URL}/checklists/${courseId}`, name: 'Checklists', part: 3 },
  ];

  return <div className='studio-nav' data-testid='studio-nav'>
    <div className="w-100 px-xl-5 px-lg-3 d-flex py-xl-3 py-2 justify-content-between">

      <nav className="d-lg-none navbar pb-0 navbar-expand-md p-0 m-0 w-100">
        <div className="d-flex d-lg-none align-items-center justify-content-between w-100 mx-3">
          <div className="d-flex">
            <a href={`${getSiteConfig('LEARNING_BASE_URL')}/learning/course/${courseId}/home`} className="mr-xl-4 mr-lg-3 mr-md-2">
              <img className="mr-xl-2 mr-md-1 home-icon" src={homeIcon} alt="home" />
            </a>
          </div>
          <div className="d-flex align-items-center">
            <a href={`${STUDIO_URL}/settings/advanced/${courseId}`} className="mr-xl-4 mr-lg-3 mr-md-2 mr-0 settings-icon">
              <img src={settingIcon} />
            </a>
            <button className="navbar-toggler pr-xl-4 pr-lg-3 pr-md-2 pr-0 d-flex d-lg-none" type="button" onClick={() => setShowNav(!showNav)}>
              <div className="menu-toggle-icon d-xl-none" style={{ backgroundImage: `url(${showNav ? closeIconWhite : hamburgerWhiteIcon})`, backgroundPosition: 'bottom' }} />
            </button>
          </div>
        </div>
      </nav>

      <div className='d-none d-lg-flex align-items-center'>
        <a href={`${getSiteConfig('LEARNING_BASE_URL')}/learning/course/${courseId}/home`} className="ml-0">
          <img className="home-icon" src={homeIcon} alt="home" />
        </a>
        {navItems.filter(x => x.part === 1).map((navItem, index) => 
          <a href={navItem.url} key={`studio-nav-part1-${index}`} className={`${activeTab === navItem.name ? 'active' : ''}`}>{navItem.name}</a>
        )}
      </div>
      <div className='d-none d-lg-flex align-items-center'>
        {navItems.filter(x => x.part === 2).map((navItem, index) => 
          <a href={navItem.url} key={`studio-nav-part2-${index}`} className={`${activeTab === navItem.name ? 'active' : ''}`}>{navItem.name}</a>
        )}
      </div>
      <div className='d-none d-lg-flex align-items-center'>
        {navItems.filter(x => x.part === 3).map((navItem, index) => 
          <a href={navItem.url} key={`studio-nav-part3-${index}`} className={`${activeTab === navItem.name ? 'active' : ''}`}>{navItem.name}</a>
        )}
        <a href={`${STUDIO_URL}/settings/advanced/${courseId}`} className="settings-icon mr-0">
          <img src={settingIcon} />
        </a>
      </div>
    </div>
    <div className={`navbar-collapse w-100 d-xl-none collapse position-relative ${showNav ? 'show' : ''}`}>
      <ul className="navbar-nav mr-auto position-absolute">
        {navItems.map((navItem, index) => (<li className="nav-item d-lg-none px-2" key={`studio-nav-mobile-${index}`}>
          <a href={navItem.url} className={`nav-link m-2 ${activeTab === navItem.name ? 'active' : ''}`}>{navItem.name}</a>
        </li>))}
      </ul>
    </div>
  </div>
};

export default StudioNav;
