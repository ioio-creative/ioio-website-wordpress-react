import React from 'react';

export default function MyFirstLoadingComponent(props) {
  const { isLoading, error } = props;
  // Handle the loading state
  if (isLoading) {
    return <div id="loading-screen"></div>;
  }
  // Handle the error state
  else if (error) {
    //alert(error);
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
    return null;
  }
};
