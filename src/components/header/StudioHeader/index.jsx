import React from 'react';
import { getSiteConfig } from '../../../utils';

import TopBar from '../segments/TopBar';
import CourseNav from '../segments/CourseNav';
import StudioNav from '../segments/StudioNav';
import CourseBar from '../segments/CourseBar';

const StudioHeader = ({ courseId, title }) => {
  
  return <div className='xen-header studio-header'>
    {getSiteConfig('SHOW_PUBLIC_SITE') && <TopBar />}

    <CourseNav />

    {
      getSiteConfig('ENABLE_CUSTOM_HEADER') ? 
      <StudioNav courseId={courseId} /> : 
      <CourseBar courseId={courseId} courseTitle={title} />
    }
  </div>;
}

export default StudioHeader;
