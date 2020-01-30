import React, {Component} from 'react';

function Items(props) {
  //let id = 0;
  const social_media_items = props.dnas.map((dna, id) => {
    let h
    h = "col-lg-4 box-bg-0" + (
    id + 1)
    return (<div className={h} key={id}>
      <h4 className="core-value-title text-left">{dna.my_name}</h4>
      <div className="text-center">
        <img src={dna.image.guid} alt="alt" className="img-fluid core-value-img"/>
      </div>
      <p className="description text-center">{dna.desc}</p>
    </div>);
  });

  return (<div className="row wow fadeInUp">
    {social_media_items}
  </div>);
}

class About03 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {}
    };
  }

  render() {
    const a = this.props.about
    return (<section id="core-value" className="">
      <div className="container-fluid">
        <Items dnas={a.dnas}/>
      </div>
    </section>);
  }
}

export default About03;
