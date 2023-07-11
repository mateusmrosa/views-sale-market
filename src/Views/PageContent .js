import React from 'react';
import Sidebar from '../Sidebar/Sidebar';

const PageContent = ({ children }) => {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-3">
          <Sidebar />
        </div>
        <div className="col-md-9">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageContent;
