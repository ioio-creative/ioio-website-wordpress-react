import React, {Component} from 'react';



function Items(props) {
  const member_items = props.items.map((item, id) => {
    return (
      <div className="col-md-3 wow fadeInUp">
        <div className="img">
          <img src={item.image.guid} alt={item.my_name} className="img-fluid" />
        </div>
    </div>
    );
  });

  return (
        <div className="row services-cols">

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

    return ( <section id="clients">
        <div className="container">
          <header className="section-header">
            <h3>Clients</h3>
            <p>Our team brings a wealth of experience from some of the world’s most
              formidable production studios, agencies and startups.</p>
          </header>
          <div className="row about-cols">

              <div className="about-col">
                <Items items={a.clients}/>
              </div>

          </div>
        </div>
      </section>);
  }
}

export default About07;
