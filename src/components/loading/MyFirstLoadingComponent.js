import './MyFirstLoadingComponent.scss';

import React from 'react';


export default function MyFirstLoadingComponent(props) {
  const { isLoading, error } = props;
  let loadScreen;
  // Handle the loading state
  if (isLoading) {
    loadScreen = (
      <div className="loading-screen" />
    );
  }
  // Handle the error state
  else if (error) {
    //alert(error);
    console.error(error);
    loadScreen = (
      <div className='loading-error'>
        Sorry, there was a problem loading the page.
      </div>
    );
  }
  else {
    return null;
  }

  return (
    <div className='my-first-loading'>
      {loadScreen}
    </div>
  );
};