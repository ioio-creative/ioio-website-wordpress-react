import React, {Component} from 'react';

function Items(props) {
  const member_items = props.items.map((item, id) => {
    return (
    <div className="col-md-3 wow fadeInUp" data-wow-delay="0.3s">
      <div className="services-col">
      <div className="img">
        <img src={item.image.guid} alt="alt" className="img-fluid"/>
      </div>
      <p>
        {item.desc}
      </p>
    </div>
  </div>);
  });

  return (
        <div className="row services-cols">

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
  return (<section id="services">
    <div className="container">
      <header className="section-header">
        <h3>{a.service_section_title}</h3>
        <p>{a.service_section_desc}}</p>
      </header>
        <Items items={a.services}/>
    </div>
  </section>);
}
}

export default About06;
