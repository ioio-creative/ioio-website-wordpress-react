import React, {Component} from 'react';

function Slideshow(props) {
  const member_items = props.members.map((member, id) => {
    return (<div className="item" key={id}>
      <div className="pad15">
        <img className="the-team-img" alt="alt" src={member.image.guid}/>
        <h3 className="lead">{member.my_name}</h3>
        <p>{member.my_title}</p>
      </div>
    </div>);
  });

  return (<div className="MultiCarousel-inner">
    {member_items}
  </div>);
}

class About05 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {}
    }
  }

  render() {
    let a = this.props.about
    let members = a.team_members
    return (<section id="the-team">
      <div className="container">
        <header className="section-header">
          <h3>{a.team_section_title}</h3>
          <p>{a.team_section_desc}</p>
        </header>
        <div className="row">
          {/* Change data items for xs,sm,md and lg display items respectively. Ex:data-items="1,3,5,6" Change data slide for slides per click Ex:data-slide="1"  */}
          <div className="MultiCarousel" data-items="1,1.5,2.5,3.5" data-slide={1} id="MultiCarousel" data-interval={1000}>
            <Slideshow members={members}/>
            <button className="btn btn-primary leftLst">&lt;</button>
            <button className="btn btn-primary rightLst">&gt;</button>
          </div>
        </div>
      </div>
    </section>);
  }
}

export default About05;
