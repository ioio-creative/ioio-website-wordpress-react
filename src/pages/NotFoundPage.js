import './NotFoundPage.scss';

import React from 'react';

function NotFoundPage(props) {
  console.log("not found");
  return (
    <div className='not-found-page'>
      <div className='content-container'>
        <h3>404 page not found</h3>
        <p>We are sorry but the page you are looking for does not exist.</p>
      </div>
    </div>
  );
}

export default NotFoundPage;