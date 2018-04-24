import React, {Component} from 'react';

import {getMultipleTextsFromSingleText} from 'utils/textAreaDelimiter';

function SlideshowLeft(props) {
  const member_items = props.slides.map((slide, id) => {

    if (id % 2 == 1)

      return (<div className="slideshow-2-col-item">
        <img src={slide.guid} className="img-fluid" alt=""/>
        <p>Say sth</p>
      </div>);
    }
  );

  return (<div className="col-lg-6 text-center">
    {member_items}
  </div>);
}

function SlideshowRight(props) {
  const member_items = props.slides.map((slide, id) => {

    if (id % 2 == 0)

      return (<div className="slideshow-2-col-item">
        <img src={slide.guid} className="img-fluid" alt=""/>
        <p>Say sth</p>
      </div>);
    }
  );

  return (<div className="col-lg-6 text-center">
    {member_items}
  </div>);
}

class ProjectTemp06 extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const props = this.props;
    let styleText = {
      background: 'url(img/Triangle.png) center top'
    };
    return (<section className="slideshow-2-col" style={styleText}>
      <div className="container-fluid">
        <div className="row">
          <SlideshowLeft slides={props.images}/>
          <SlideshowRight slides={props.images}/>
        </div>
      </div>
    </section>);
  }
}

export default ProjectTemp06;
