import React, { Component } from 'react';

class LabTemp08 extends Component {
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
      <section className="photo-montage-one-img-full-width project-section-bg wow fadeInUp">
        <div className="container-fluid" style={bg}>
          <img src={image0} alt="" />
        </div>
      </section>
    );
  }
}

export default LabTemp08;
