import React from 'react';
import {Switch, Route} from 'react-router-dom';
import asyncLoadingComponent from 'components/loading/AsyncLoadingComponent';

import {LanguageContextConsumer, passLanguageToAsyncLoadingComponentFunc} from 'globals/contexts/languageContext';
import {AddressListContextConsumer} from 'globals/contexts/addressListContext';

import routes from 'globals/routes';


const AsyncDarkFooter = asyncLoadingComponent(_ => import("./DarkFooter"));
const AsyncBrightFooter = asyncLoadingComponent(_ => import("./BrightFooter"));


function Footer() {
  return (
    <LanguageContextConsumer>
      { 
        value => {
          const languageContextValue = value;
          return (
            <AddressListContextConsumer>
              {
                value => {
                  const addressListContextValue = value;
                  const otherPropsObj = {
                    addresses: addressListContextValue.addresses
                  };
                  return (
                    <Switch>
                      {/*
                          Switch component behaves similarly to the "switch" construct
                          in programming. Once a Route is matched, subsequent Routes
                          will be ignored. So we should use "exact" keyword on more
                          generic paths, like "/", or put more generic paths as the
                          later Routes in the Route list.
                      */}
                      <Route path={routes.lab(false)} render={passLanguageToAsyncLoadingComponentFunc(languageContextValue.language, AsyncDarkFooter, otherPropsObj)} />
                      <Route render={passLanguageToAsyncLoadingComponentFunc(languageContextValue.language, AsyncBrightFooter, otherPropsObj)} />
                    </Switch>
                  );
                }
              }
            </AddressListContextConsumer>
          )
        }
      }
    </LanguageContextConsumer>
  );
}


export default Footer;
