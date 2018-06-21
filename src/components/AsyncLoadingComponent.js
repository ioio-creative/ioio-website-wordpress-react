import React from 'react';
import Loadable from 'react-loadable';

function asyncLoadingComponent(funcToImportPage) {
  return Loadable({
    loader: funcToImportPage,
    loading: LoadingComponent
  });
}

function LoadingComponent(props) {
  const { isLoading, error } = props;
  // Handle the loading state
  if (isLoading) {
    return <div id="loading-screen"></div>;
  }
  // Handle the error state
  else if (error) {
    return <div>Sorry, there was a problem loading the page.</div>;
  }
  else {
    return null;
  }
}

export {
  asyncLoadingComponent,
  LoadingComponent
}
