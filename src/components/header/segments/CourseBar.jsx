import React from 'react';
import StudioNav from './StudioNav';
import { getSiteConfig } from '../../../utils';

const getBannerUrl = () => {
  if (getSiteConfig('course_banner_img')) return getSiteConfig('course_banner_img');
  if (getSiteConfig('enable_header_banner_img')) return getSiteConfig('header_banner_img');
  return null;
};

const CourseBar = ({ courseTitle, courseId }) => {

  const bannerUrl = getBannerUrl();

  return <div
    data-testid='course-bar'
    className={`main-bar px-xl-5 px-lg-3 px-3 ${bannerUrl ? '' : 'banner-color'}`}
    {...(bannerUrl && { style: { backgroundImage: `url('${bannerUrl}')` } }) }
  >
    <h1>{courseTitle}</h1>
    <StudioNav courseId={courseId} />
  </div>
};

export default CourseBar;
