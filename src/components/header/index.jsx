import React, { useContext } from 'react';
import { AppContext } from '@edx/frontend-platform/react';

import { getSiteConfig } from '../../utils';
import TopBar from './segments/TopBar';
import CourseNav from './segments/CourseNav';
import { addIcon } from '../../assets';


const Header = () => {

  const { authenticatedUser } = useContext(AppContext);

  return (
    <header className="xen-header learning-header">
      {getSiteConfig('SHOW_PUBLIC_SITE') && <TopBar />}

      <CourseNav />
      
      <div 
        className={`header-banner ${getSiteConfig('enable_header_banner_img') ? '' : 'banner-color'}`}
        {...(getSiteConfig('enable_header_banner_img') && { style: { backgroundImage: `url('${getSiteConfig('header_banner_img')}')` } }) }
      >
        <img className="header-logo-image" src={getSiteConfig('header_logo')} alt="Header logo" />

        {authenticatedUser.userId && <div className="create-space">
          <a data-toggle="modal" data-target="#createSpaceModal" className="d-flex create-space-modal">
            <img src={addIcon} />
            <p className="create-space-text pl-2">Create Space</p>
          </a>
        </div>}
      </div>
    </header>
  );
};

export default Header;
