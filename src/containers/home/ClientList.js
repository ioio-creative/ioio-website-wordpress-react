import './ClientList.scss';

import React from 'react';
import {FormattedMessage} from 'react-intl';

import isNonEmptyArray from 'utils/js/array/isNonEmptyArray';


function Client(props) {
  const { name, imgSrc } = props;
  return (    
    <div className="client">
      <img src={imgSrc} alt={name} className="img-fluid" />
    </div>    
  );
}


function Clients(props) {
  const { clients } = props;
  
  return (
    <div className="clients">
      <div className="row">
        {
          clients.map((client) => (
            <div className="col-md-4 col-xs-4 col-sm-4 wow fadeIn client-container" key={client.my_name}>
              <Client
                name={client.my_name}
                imgSrc={client.image.guid}
              />
            </div>
          ))
        }
      </div>
    </div>
  );
}


function ClientList(props) {
  const { 
    clients
  } = props;

  if (!isNonEmptyArray(clients)) {
    return null;
  }  

  return (
    <div className='home-client-list'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-10">
            <div className="row">
              <div className="col-md-6 col-sm-12">
                <header className="section-header">
                  <h3>
                    <span className="title-first-half">
                      <FormattedMessage
                        id="HomePage.highlightedClientsLabel.firstHalf"
                        defaultMessage="Selected "
                      />
                    </span>
                    <span className="title-second-half">
                      <FormattedMessage
                        id="HomePage.highlightedClientsLabel.secondHalf"
                        defaultMessage="Clients"
                      />
                    </span>
                  </h3>
                </header>
              </div>
              <div className="col-md-6 col-sm-12">
                <Clients clients={clients}/>
              </div>
            </div>
          </div>          
          <div className="col-md-1" />
        </div>                  
      </div>
    </div>
  );
}


export default ClientList;