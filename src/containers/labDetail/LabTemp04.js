import React, { Component } from 'react';

class LabTemp04 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      const props = this.props;
      const bg = {
        backgroundColor: props.background_mood_color,
      };
        return (
          <section className="photo-montage-one-img project-section-bg wow fadeInUp" style={bg}>
            {/* TODO: modified by Chris */}
            {/* <div className="container"> */}
            <div className="row container-fluid">
              <div className="col-md-1 ">

              </div>
              <div className="col-md-10">
                <img src={props.images[0].guid} className="img-fluid" alt="alt"/>
              </div>
            </div>
            {/* </div> */}
          </section>
        );
    }
}

export default LabTemp04;
