import React, { Component } from 'react';

class ProjectTemp04 extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      const props = this.props;

        return (
          <section className="photo-montage-one-img section-bg wow fadeInUp">
            <div className="row container-fluid ">
              <div className="col-md-12 text-center">
                <img src={props.images[0].guid} className="img-fluid" alt="alt"/>
              </div>
            </div>
          </section>
        );
    }
}

export default ProjectTemp04;
