import React, { Component } from 'react';

class ProjectTemp04 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      const props = this.props;

        return (
          <section className="photo-montage-one-img section-bg wow fadeInUp">
            <div className="container">
            <img src={props.images[0].guid} className="img-fluid" alt="alt"/>
            </div>
          </section>
        );
    }
}

export default ProjectTemp04;
