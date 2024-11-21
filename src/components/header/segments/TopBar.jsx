import React from 'react';
import { getSiteConfig } from '../../../utils';
import { webIcon } from '../../../assets';


const TopBar = () => {
  return <div className="d-flex align-items-center justify-content-end w-100 top-bar" data-testid="top-bar">
    <div className="d-flex align-items-center">
      <img className="img-fluid" src={webIcon} />
      <h5 className="m-0 pl-1 text-white">
        {getSiteConfig('org_official_site_help_text') + ' '}
        <a href={getSiteConfig('org_official_site_url')} className='text-white' target="_blank">
          {getSiteConfig('org_official_site_url')}
        </a>
      </h5>
    </div>
  </div>
}

export default TopBar;
