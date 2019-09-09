import React, {Component} from 'react';
import 'aframe';
import {Entity, Scene} from 'aframe-react';
/**
 * scrollable png sequences template
 */
class ProjectTemp12 extends Component {
  constructor(props) {
    super(props);
  }
  
  render() {
    const props = this.props;
    const bg = {
      backgroundColor: props.background_mood_color,
      width:'100%',
      paddingTop:'46.25%',
      position:'relateive'
    };
    return <section className="photo-montage-one-img project-section-bg wow fadeInUp" style={bg}>
    {/* TODO: modified by Chris */}
    {/* <div className="container"> */}
      <div className="row container-fluid" style={{position:'absolute',height:'100%',top:0}}>
        <div className="col-md-1 ">
        </div>
        <div className="col-md-10">
          <Scene embedded>
            <Entity primitive='a-sky' src="/img/puydesancy.jpg"/>
          </Scene>
          {/* <a-scene embedded>
            <a-sky src={props.images[0].guid} rotation="0 -130 0"></a-sky>
          </a-scene> */}
        </div>
      </div>
    {/* </div> */}
  </section>
  }
}

export default ProjectTemp12;
