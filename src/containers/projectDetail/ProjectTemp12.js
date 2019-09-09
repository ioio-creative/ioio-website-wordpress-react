import React, { Component } from 'react';
import 'aframe';
class ProjectTemp12 extends Component {
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
                <div style={{
                  paddingTop: '56.25%',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                  }}>
                    <a-scene embedded>
                      <a-assets>
                        <img src={props.images[0].guid} id="img360" crossorigin="anonymous"/>
                      </a-assets>
                      <a-sky src="#img360"/>
                    </a-scene>
                  </div>
                </div>
              </div>
            </div>
          {/* </div> */}
        </section>
      );
    }
}

export default ProjectTemp12;
