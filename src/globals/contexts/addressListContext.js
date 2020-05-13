import React, { useState, useEffect } from 'react';
import { LanguageContextConsumer } from 'globals/contexts/languageContext';
import { fetchAllAddressList } from 'websiteApi';
import isNonEmptyArray from 'utils/js/array/isNonEmptyArray';

const AddressListContext = React.createContext();

function AddressListContextProviderCore({ languageCode, children }) {
  const [addresses, setAddresses] = useState(null);
  useEffect(
    _ => {
      fetchAllAddressList(addressList => {
        if (isNonEmptyArray(addressList.addresses)) {
          setAddresses(addressList.addresses);
        }
      });
    },
    [languageCode]
  );

  return (
    <AddressListContext.Provider
      value={{
        addresses
      }}
    >
      {children}
    </AddressListContext.Provider>
  );
}

function AddressListContextProvider(props) {
  const { children } = props;

  return (
    <LanguageContextConsumer>
      {value => {
        const langCode = value.language.code;
        return (
          <AddressListContextProviderCore languageCode={langCode}>
            {children}
          </AddressListContextProviderCore>
        );
      }}
    </LanguageContextConsumer>
  );
}

export default AddressListContext;

export { AddressListContextProvider };
