import React from 'react';

import TopBar from '../segments/TopBar';
import StudioNav from '../segments/StudioNav';
import CourseNav from '../segments/CourseNav';
import CourseBar from '../segments/CourseBar';
import { getSiteConfig } from '../../../utils';


const LearningHeader = ({ courseId, courseTitle }) => {

  return (
    <header className="xen-header learning-header">
      {getSiteConfig('SHOW_PUBLIC_SITE') && <TopBar />}

      <CourseNav />

      {
        getSiteConfig('ENABLE_CUSTOM_HEADER') ? 
        <StudioNav courseId={courseId} /> : 
        <CourseBar courseId={courseId} courseTitle={courseTitle} />
      }

    </header>
  );
};

export default LearningHeader;
