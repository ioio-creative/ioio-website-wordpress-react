import React, {Component} from 'react';

class About02 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      about: {}
    }
  }

  render() {
    //const company = this.state.company;
    return (<section id="media" className="wow fadeIn">
      <div className="container text-left">
        <h1>we try to create new nodes in the network between physical and virtual, new meaning of interaction, new perspective to see.
        </h1>
        <div className="media-video text-center">
          <iframe src="https://player.vimeo.com/video/219185142" width={640} height={360} frameBorder={0} webkitallowfullscreen="webkitallowfullscreen" mozallowfullscreen="mozallowfullscreen" allowFullScreen="allowFullScreen"/>
        </div>
        <p>From content and interactive to experiential and D/OOH.<br/>
          Here's a showcase of some of our most recent work:
        </p>
      </div>
    </section>);
  }
}

export default About02;
