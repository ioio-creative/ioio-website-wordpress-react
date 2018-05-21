import React, {Component} from 'react';

function Items(props) {
  const member_items = props.items.map((item, id) => {
    return (<div className="col-md-3 wow fadeInRight" key={id} data-wow-delay="0.3s">
      <div className="services-col">
        <div className="img">
          <img src={item.image.guid} alt="alt" className="img-fluid"/>
        </div>
        <div className="item-desc">
        <p>
          {item.desc}
        </p>
      </div>
      <h3>{item.my_name}</h3>
      </div>
    </div>);
  });

  return (<div className="row services-cols">

    {member_items}
  </div>);

}

class About06 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {}
    }
  }

  render() {
    var a = this.props.about

    return (<section id="services" className="about-section-bg">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
            <header className="section-header">
              <h3>{a.service_section_title}</h3>
              <p>{a.service_section_desc}</p>
            </header>
            <Items items={a.services}/>
          </div>
          <div className="col-md-1"></div>
        </div>
      </div>
    </section>);
  }
}

export default About06;
