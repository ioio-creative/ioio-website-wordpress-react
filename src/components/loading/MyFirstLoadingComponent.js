import './MyFirstLoadingComponent.css';

import React from 'react';


export default function MyFirstLoadingComponent(props) {
  const { isLoading, error } = props;
  // Handle the loading state
  if (isLoading) {
    return (
      <div id="loading-screen" />
    );
  }
  // Handle the error state
  else if (error) {
    //alert(error);
    console.error(error);
    return (
      <div className='loading-error'>
        Sorry, there was a problem loading the page.
      </div>
    );
  }
  else {
    return null;
  }
};