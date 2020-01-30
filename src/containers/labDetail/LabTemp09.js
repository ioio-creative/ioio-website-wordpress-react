import React, { Component } from 'react';

class LabTemp09 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    const bg = {
      backgroundColor: props.background_mood_color,
    };

    let image0 = '';
    if (props.images) {
      image0 = props.images[0].guid;
    }

    return (
      <section className="photo-montage-one-text project-section-bg wow fadeIn">
        <div className="container-fluid" style={bg}>
          <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4"><p>{props.description}</p></div>
            <div className="col-md-4"></div>
          </div>
          <p></p>
        </div>
      </section>
    );
  }
}

export default LabTemp09;
