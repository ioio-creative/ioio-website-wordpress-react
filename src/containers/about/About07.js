import React, {Component} from 'react';

function Items(props) {
  const member_items = props.items.map((item, id) => {
    return (<div className="col-md-3 wow fadeIn" key={id}>
      <div className="img client-col">
        <img src={item.image.guid} alt={item.my_name} className="img-fluid"/>
      </div>
    </div>);
  });

  return (<div className="row client-cols">

    {member_items}
  </div>);

}

class About07 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {}
    }
  }

  render() {
    var a = this.props.about

    return (<section id="clients" className="about-section-bg">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <header className="section-header">
              <h3>{a.client_section_title}</h3>
              <p>{a.client_section_desc}</p>
            </header>
            <div className="row about-cols">
              <div className="about-col">
                <Items items={a.clients}/>
              </div>
            </div>
          </div>
          <div className="col-md-1"></div>
        </div>

      </div>
    </section>);
  }
}

export default About07;
