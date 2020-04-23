import React, {useState, useEffect} from 'react';
import {fetchAllAddressList} from 'websiteApi';
import isNonEmptyArray from 'utils/js/array/isNonEmptyArray';


const AddressListContext = React.createContext();


function AddressListContextProvider(props) {
  const {
    children
  } = props;

  const [addresses, setAddresses] = useState(null);
  useEffect(_ => {
    fetchAllAddressList((addressList) => {      
      if (isNonEmptyArray(addressList.addresses)) {
        setAddresses(addressList.addresses);
      }      
    });
  }, []);

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


const AddressListContextConsumer = AddressListContext.Consumer;


export {  
  AddressListContextProvider,
  AddressListContextConsumer    
};
