import './ClientList.css';

import React from 'react';

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
            <div className="col-md-3 col-xs-4 col-sm-4 wow fadeIn" key={client.my_name}>
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
    title, desc, clients
  } = props;

  if (!isNonEmptyArray(clients)) {
    return null;
  }  

  return (
    <div className='client-list'>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-5">
            <header className="section-header">
              <h3>{title}</h3>
              {
                desc &&
                <p>{desc}</p>
              }              
            </header>
          </div>
          <div className="col-md-5">
            <Clients clients={clients}/>
          </div>
          <div className="col-md-1" />
        </div>                  
      </div>
    </div>
  );
}


export default ClientList;