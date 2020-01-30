import React from 'react';

import isNonEmptyArray from 'utils/js/array/isNonEmptyArray';


function Client(props) {
  const { name, imgSrc } = props;
  return (    
    <div className="img client-col">
      <img src={imgSrc} alt={name} className="img-fluid" />
    </div>    
  );
}


function Clients(props) {
  const { clients } = props;
  
  return (
    <div className="row client-cols">
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
    <section id="clients" className="about-section-bg">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1" />
          <div className="col-md-10">
            <header className="section-header">
              <h3>{title}</h3>
              <p>{desc}</p>
            </header>
            <div className="row about-cols">
              <div className="about-col">
                <Clients clients={clients}/>
              </div>
            </div>
          </div>
          <div className="col-md-1" />
        </div>
      </div>
    </section>
  );
}


export default ClientList;