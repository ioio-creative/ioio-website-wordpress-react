import React, {useState, useEffect} from 'react';
import {Switch, Route} from 'react-router-dom';
import asyncLoadingComponent from 'components/loading/AsyncLoadingComponent';

import {LanguageContext, passLanguageToAsyncLoadingComponentFunc} from 'globals/contexts/languageContext';

import {fetchAllAddressList} from 'websiteApi';

import routes from 'globals/routes';
import isNonEmptyArray from 'utils/js/array/isNonEmptyArray';


const AsyncDarkFooter = asyncLoadingComponent(_ => import("./DarkFooter"));
const AsyncBrightFooter = asyncLoadingComponent(_ => import("./BrightFooter"));


function Footer() {
  const [addresses, setAddresses] = useState(null);
  useEffect(_ => {
    fetchAllAddressList((addressList) => {      
      if (isNonEmptyArray(addressList.addresses)) {
        setAddresses(addressList.addresses);
      }      
    });
  }, []);
  return (
    <LanguageContext.Consumer>
      {value => (
        <Switch>
          {/*
              Switch component behaves similarly to the "switch" construct
              in programming. Once a Route is matched, subsequent Routes
              will be ignored. So we should use "exact" keyword on more
              generic paths, like "/", or put more generic paths as the
              later Routes in the Route list.
          */}
          <Route path={routes.lab(false)} render={passLanguageToAsyncLoadingComponentFunc(value.language, AsyncDarkFooter, {addresses})} />
          <Route render={passLanguageToAsyncLoadingComponentFunc(value.language, AsyncBrightFooter, {addresses})} />
        </Switch>
      )}
    </LanguageContext.Consumer>
  );
}


export default Footer;
