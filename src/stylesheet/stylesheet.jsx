import React from 'react';
import { Helmet } from 'react-helmet';
import { HelmetProvider } from 'react-helmet-async';

const FetchStyleSheetComponent = ({config}) => {
  var styleSheetUrl = config.LMS_BASE_URL + '/static/xen-common-theme/css/default.css';
  
  if(config.VARIABLE_CSS_FILE) {
    styleSheetUrl = config.VARIABLE_CSS_FILE;
  }
  
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <link
            rel="stylesheet"
            href={styleSheetUrl}
          />
        </Helmet>
      </div>
    </HelmetProvider>
  );
}

export default FetchStyleSheetComponent;
